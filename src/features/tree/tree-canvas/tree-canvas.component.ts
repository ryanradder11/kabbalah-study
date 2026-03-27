import { Component, Input, OnChanges, OnDestroy, ElementRef, viewChild, afterNextRender, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import * as d3 from 'd3';
import { SefirotService } from '../../../core/services/sefirot.service';
import { PathsService } from '../../../core/services/paths.service';
import { QliphothService } from '../../../core/services/qliphoth.service';
import { Sefirah } from '../../../core/models/sefirah.model';
import { KabbalahPath } from '../../../core/models/path.model';
import { Qliphah } from '../../../core/models/qliphah.model';

const SVG_W = 420;
const SVG_H = 630;
const NODE_R = 28;

@Component({
  selector: 'app-tree-canvas',
  standalone: true,
  template: `<svg #svgEl [attr.viewBox]="'0 0 ' + svgW + ' ' + svgH" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;background:#0d0d1a;"></svg>`,
  styles: [':host { display: block; width: 100%; height: 100%; }'],
})
export class TreeCanvasComponent implements OnChanges, OnDestroy {
  @Input() showDaat = false;
  @Input() showQliphoth = false;

  readonly svgW = SVG_W;
  readonly svgH = SVG_H;

  private readonly svgRef = viewChild.required<ElementRef<SVGSVGElement>>('svgEl');
  private readonly router = inject(Router);
  private readonly zone = inject(NgZone);
  private readonly sefirotSvc = inject(SefirotService);
  private readonly pathsSvc = inject(PathsService);
  private readonly qliphothSvc = inject(QliphothService);

  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined> | null = null;
  private zoom: d3.ZoomBehavior<SVGSVGElement, unknown> | null = null;

  constructor() {
    afterNextRender(() => {
      this.zone.runOutsideAngular(() => {
        this.initD3();
        this.render();
      });
    });
  }

  ngOnChanges(): void {
    if (this.svg) {
      this.zone.runOutsideAngular(() => this.render());
    }
  }

  ngOnDestroy(): void {
    if (this.svg) {
      this.svg.on('.zoom', null);
      this.svg.selectAll('*').remove();
    }
  }

  private initD3(): void {
    const el = this.svgRef().nativeElement;
    this.svg = d3.select(el);

    this.zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 3])
      .on('zoom', (event) => {
        this.svg!.select('g.root').attr('transform', event.transform);
      });

    this.svg.call(this.zoom);
    this.svg.on('dblclick.zoom', () => {
      this.svg!.transition().duration(500).call(this.zoom!.transform, d3.zoomIdentity);
    });

    this.svg.append('g').attr('class', 'root');
  }

  private render(): void {
    if (!this.svg) return;
    const root = this.svg.select<SVGGElement>('g.root');
    root.selectAll('*').remove();

    const sefirot = this.sefirotSvc.sefirot();
    const paths = this.pathsSvc.paths();
    const qliphoth = this.qliphothSvc.qliphoth();

    this.drawPillarLines(root);
    this.drawPaths(root, paths, sefirot);
    this.drawSefirot(root, sefirot);

    if (this.showQliphoth) {
      this.drawQliphoth(root, qliphoth);
    }
  }

  private drawPillarLines(root: d3.Selection<SVGGElement, unknown, null, undefined>): void {
    const pillars = [
      { x: 90, label: 'Severity', color: '#cc0000' },
      { x: 200, label: 'Middle', color: '#8a2be2' },
      { x: 310, label: 'Mercy', color: '#4169e1' },
    ];
    root.selectAll('line.pillar')
      .data(pillars)
      .enter()
      .append('line')
      .attr('class', 'pillar')
      .attr('x1', d => d.x).attr('y1', 30)
      .attr('x2', d => d.x).attr('y2', SVG_H - 30)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '4 6')
      .attr('opacity', 0.2);

    root.selectAll('text.pillar-label')
      .data(pillars)
      .enter()
      .append('text')
      .attr('class', 'pillar-label')
      .attr('x', d => d.x)
      .attr('y', 18)
      .attr('text-anchor', 'middle')
      .attr('fill', d => d.color)
      .attr('opacity', 0.5)
      .attr('font-size', '9px')
      .attr('font-family', 'Cinzel, serif')
      .text(d => d.label);
  }

  private drawPaths(
    root: d3.Selection<SVGGElement, unknown, null, undefined>,
    paths: KabbalahPath[],
    sefirot: Sefirah[]
  ): void {
    const sefirahMap = new Map(sefirot.map(s => [s.id, s]));

    const lines = root.selectAll('line.path-edge')
      .data(paths)
      .enter()
      .append('line')
      .attr('class', 'path-edge')
      .attr('x1', d => sefirahMap.get(d.fromSefirah)?.svgX ?? 0)
      .attr('y1', d => sefirahMap.get(d.fromSefirah)?.svgY ?? 0)
      .attr('x2', d => sefirahMap.get(d.toSefirah)?.svgX ?? 0)
      .attr('y2', d => sefirahMap.get(d.toSefirah)?.svgY ?? 0)
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .attr('opacity', 0.7)
      .style('cursor', 'pointer');

    lines.on('mouseover', function() {
      d3.select(this).attr('stroke-width', 4).attr('opacity', 1);
    });
    lines.on('mouseout', function() {
      d3.select(this).attr('stroke-width', 2).attr('opacity', 0.7);
    });
    lines.on('click', (event, d) => {
      event.stopPropagation();
      this.zone.run(() => this.router.navigate(['/paths', d.id]));
    });

    root.selectAll('text.path-letter')
      .data(paths)
      .enter()
      .append('text')
      .attr('class', 'path-letter')
      .attr('x', d => {
        const from = sefirahMap.get(d.fromSefirah);
        const to = sefirahMap.get(d.toSefirah);
        return from && to ? (from.svgX + to.svgX) / 2 : 0;
      })
      .attr('y', d => {
        const from = sefirahMap.get(d.fromSefirah);
        const to = sefirahMap.get(d.toSefirah);
        return from && to ? (from.svgY + to.svgY) / 2 : 0;
      })
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', d => d.color)
      .attr('font-size', '14px')
      .attr('font-family', 'Noto Sans Hebrew, serif')
      .attr('pointer-events', 'none')
      .text(d => d.hebrewLetter);
  }

  private drawSefirot(
    root: d3.Selection<SVGGElement, unknown, null, undefined>,
    sefirot: Sefirah[]
  ): void {
    const visible = sefirot.filter(s => !s.isHidden || this.showDaat);

    const nodeGroups = root.selectAll<SVGGElement, Sefirah>('g.sefirah-node')
      .data(visible, d => d.id)
      .enter()
      .append('g')
      .attr('class', 'sefirah-node')
      .attr('transform', d => `translate(${d.svgX},${d.svgY})`)
      .style('cursor', 'pointer');

    nodeGroups.append('circle')
      .attr('r', NODE_R)
      .attr('fill', d => d.color.beriah.toUpperCase() === '#FFFFFF' ? '#1a1a2e' : d.color.beriah)
      .attr('stroke', d => d.isHidden ? '#888' : d.color.beriah.toUpperCase() === '#FFFFFF' ? '#ffffff' : '#c9a96e')
      .attr('stroke-width', d => d.isHidden ? 1 : d.color.beriah.toUpperCase() === '#FFFFFF' ? 3 : 2)
      .attr('stroke-dasharray', d => d.isHidden ? '4 3' : null)
      .attr('opacity', d => d.isHidden ? 0.6 : 1);

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('dy', '-0.4em')
      .attr('fill', '#fff')
      .attr('font-size', '13px')
      .attr('font-family', 'Noto Sans Hebrew, serif')
      .attr('pointer-events', 'none')
      .text(d => d.hebrewName.split(' ')[0]);

    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '1em')
      .attr('fill', 'rgba(255,255,255,0.8)')
      .attr('font-size', '8px')
      .attr('font-family', 'Cinzel, serif')
      .attr('pointer-events', 'none')
      .text(d => d.transliteration);

    nodeGroups.on('mouseover', function() {
      d3.select(this).select('circle')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3);
    });
    nodeGroups.on('mouseout', (event, d) => {
      d3.select(event.currentTarget as SVGGElement).select('circle')
        .attr('stroke', d.isHidden ? '#888' : '#c9a96e')
        .attr('stroke-width', d.isHidden ? 1 : 2);
    });
    nodeGroups.on('click', (event, d) => {
      event.stopPropagation();
      this.zone.run(() => this.router.navigate(['/sefirot', d.id]));
    });
  }

  private drawQliphoth(
    root: d3.Selection<SVGGElement, unknown, null, undefined>,
    qliphoth: Qliphah[]
  ): void {
    const qGroups = root.selectAll<SVGGElement, Qliphah>('g.qliphah-node')
      .data(qliphoth, d => d.id)
      .enter()
      .append('g')
      .attr('class', 'qliphah-node')
      .attr('transform', d => `translate(${d.svgX + 36},${d.svgY + 36})`)
      .style('cursor', 'pointer')
      .attr('opacity', 0.7);

    qGroups.append('circle')
      .attr('r', 14)
      .attr('fill', '#1a0000')
      .attr('stroke', '#8b0000')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', '3 2');

    qGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#8b0000')
      .attr('font-size', '9px')
      .attr('font-family', 'Noto Sans Hebrew, serif')
      .attr('pointer-events', 'none')
      .text(d => d.hebrewName[0]);

    qGroups.on('click', (event, d) => {
      event.stopPropagation();
      this.zone.run(() => this.router.navigate(['/qliphoth', d.id]));
    });
  }
}

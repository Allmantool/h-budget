import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
	selector: 'app-dashboard-root',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
	constructor(
		private location: Location,
		private meta: Meta,
		private title: Title
	) {}

	ngOnInit(): void {
		this.title.setTitle('Login');
		this.meta.updateTag({ name: 'site', content: 'My Site' });
	}

	public browserTitle = 'Home budget';

	public navigateTo(url: string): void {
		this.location.go(url);
	}

	public goBack(): void {
		this.location.back();
	}

	public goForward(): void {
		this.location.forward();
	}
}

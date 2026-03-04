// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	integrations: [
		starlight({
			title: 'Curso AIOS',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Português', lang: 'pt' },
			},
			sidebar: [
				{
					label: 'Nível 1 — Fundamentos',
					autogenerate: { directory: 'nivel-1-fundamentos' },
				},
				{
					label: 'Nível 2 — Arquitectura',
					autogenerate: { directory: 'nivel-2-arquitectura' },
				},
				{
					label: 'Nível 3 — Prática',
					autogenerate: { directory: 'nivel-3-pratica' },
				},
				{
					label: 'Nível 4 — Avançado',
					autogenerate: { directory: 'nivel-4-avancado' },
				},
			],
		}),
	],
});

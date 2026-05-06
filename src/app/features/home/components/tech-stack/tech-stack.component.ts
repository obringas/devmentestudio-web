import {
  Component,
  ChangeDetectionStrategy,
  computed,
  inject
} from '@angular/core';
import { getTechStackContent } from '../../../../data';
import { TECH_CATEGORIES, TECH_CATEGORIES_EN, TECH_STACK } from '../../../../data/tech-stack.data';
import { LocaleService } from '../../../../core/services/locale.service';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  template: `
    <section class="section relative">
      <div class="container-custom">
        <div class="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div class="section-intro">
            <span class="eyebrow">{{ copy().eyebrow }}</span>
            <h2 class="mt-6 text-4xl font-bold text-surface-100 md:text-5xl">
              {{ copy().title }}
            </h2>
            <p class="mt-5 text-lg text-surface-300">
              {{ copy().description }}
            </p>
          </div>
          <div class="rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-surface-300 lg:max-w-sm">
            {{ copy().sideNote }}
          </div>
        </div>

        <div class="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <div class="grid gap-6 md:grid-cols-2">
            @for (category of categories(); track category.key) {
              <article class="card h-full p-6 sm:p-7">
                <p class="text-xs uppercase tracking-[0.22em] text-surface-500">{{ category.label }}</p>
                <div class="mt-6 flex flex-wrap gap-3">
                  @for (tech of category.items; track tech.name) {
                    <div class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                      <div class="flex items-center gap-3">
                        <span
                          class="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold"
                          [style.backgroundColor]="tech.color + '22'"
                          [style.color]="tech.color"
                        >
                          {{ tech.name.charAt(0) }}
                        </span>
                        <div>
                          <p class="font-medium text-surface-100">{{ tech.name }}</p>
                          <p class="text-xs uppercase tracking-[0.16em] text-surface-500">{{ category.label }}</p>
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </article>
            }
          </div>

          <div class="surface-panel p-6 sm:p-8">
            <p class="text-xs uppercase tracking-[0.24em] text-surface-500">{{ copy().workflowEyebrow }}</p>
            <h3 class="mt-4 text-3xl font-display font-semibold text-surface-100">
              {{ copy().workflowTitle }}
            </h3>
            <div class="mt-8 space-y-4">
              @for (step of copy().steps; track step.title) {
                <div class="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <p class="text-sm font-semibold uppercase tracking-[0.18em] text-primary-300">{{ step.label }}</p>
                  <p class="mt-2 text-surface-300">{{ step.description }}</p>
                </div>
              }
            </div>

            <div class="mt-8 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-primary-500/10 to-accent-500/10 p-5">
              <p class="text-xs uppercase tracking-[0.22em] text-surface-500">{{ copy().coverageEyebrow }}</p>
              <div class="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p class="text-2xl font-display font-semibold text-surface-100">{{ allTech.length }}</p>
                  <p class="text-sm text-surface-400">{{ copy().coverageTech }}</p>
                </div>
                <div>
                  <p class="text-2xl font-display font-semibold text-surface-100">{{ categories().length }}</p>
                  <p class="text-sm text-surface-400">{{ copy().coverageAreas }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackComponent {
  private readonly locale = inject(LocaleService);

  readonly language = this.locale.language;
  readonly allTech = TECH_STACK;
  readonly categories = computed(() => {
    const labels = this.language() === 'en' ? TECH_CATEGORIES_EN : TECH_CATEGORIES;

    return Object.entries(labels).map(([key, label]) => ({
      key,
      label,
      items: TECH_STACK.filter((tech) => tech.category === key),
    }));
  });

  readonly copy = computed(() => getTechStackContent(this.language()));
}

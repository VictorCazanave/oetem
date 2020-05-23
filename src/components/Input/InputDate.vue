<template>
  <label class="wrapper">
    <input
      type="radio"
      :value="date"
      :checked="value === date"
      class="input"
      @change="$emit('change', date)"
    />
    <div class="label">
      <span class="month">{{ monthLabel }}</span>
      <span class="date">{{ dateLabel }}</span>
      <span class="day">{{ dayLabel }}</span>
    </div>
  </label>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import parse from 'date-fns/parse'
import format from 'date-fns/format'

@Component({
	// Customize event used for v-model
	// https://vuejs.org/v2/api/#model
	model: {
		event: 'change',
	}
})
export default class InputDate extends Vue {
  @Prop({ required: true }) readonly date!: string;
	@Prop({ required: true }) readonly value!: string;

	get parsedDate(): Date {
		return parse(this.date, 'yyyyMMdd', new Date())
	}
	get monthLabel(): string {
		return format(this.parsedDate, 'MMMM')
	}
	get dateLabel(): number {
		return this.parsedDate.getDate()
	}
	get dayLabel(): string {
		return format(this.parsedDate, 'EEEE')
	}
}
</script>

<style scoped lang="scss">
$input-date-border-radius: 0.5rem;
$input-date-top-bg: #fd9f1b;
$input-date-top-color: #fff;
$input-date-bottom-bg: $input-bg;

.wrapper {
  position: relative;
  width: 6rem;

  // TODO: Move to WhenView?
  margin: 0.25rem;
}

.input {
  // Hide native input
  position: absolute;
  z-index: -1;

  &:focus,
  &:hover {
    + .label {
      // Fake outline with round corners
      box-shadow: $input-shadow-focus;
    }
  }

  &:checked + .label {
    border-color: $input-color-selected;
  }
}

.label {
  display: flex;
  flex-direction: column;
  border: 0.25rem solid $page-bg-light;
  border-radius: 0.7rem;
  background-color: $input-bg;
  cursor: pointer;
  user-select: none;
}

.month {
  border-radius: $input-date-border-radius $input-date-border-radius 0 0;
  padding: 0.2rem 0;
  background-color: $input-date-top-bg;
  color: $input-date-top-color;
}

.date {
  padding-top: 0.2rem;
  font-size: 1.8rem;
}

.day {
  border-radius: 0 0 $input-date-border-radius $input-date-border-radius;
  padding-bottom: 0.4rem;
  font-size: 0.8rem;
  box-shadow: $input-shadow;
}

@media (min-width: $breakpoint-large) {
  .wrapper {
    // TODO: Make it bigger?
    margin: $margin-small;
  }
}
</style>

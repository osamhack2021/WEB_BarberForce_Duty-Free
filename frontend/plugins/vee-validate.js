import Vue from 'vue';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import { configure, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/ko.json';

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule],
    message: messages[rule],
  });
});

const config = {
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  },
  bails: true,
  skipOptional: true,
  mode: 'aggressive',
  useConstraintAttrs: true,
};

configure(config);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

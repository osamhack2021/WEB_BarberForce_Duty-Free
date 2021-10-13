import Vue from 'vue';
import { ValidationProvider, ValidationObserver, configure, extend } from 'vee-validate';

import { required, email, min, confirmed, max } from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/ko.json';

const rules = {
  required,
  email,
  min,
  confirmed,
  max,
};

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
//
configure(config);

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

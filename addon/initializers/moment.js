/**
  @module ember-flexberry
*/

/**
  Injects a <a href="https://github.com/stefanpenner/ember-moment">moment service</a> into current application
  components, controllers, models, routes, and views.

  @for ApplicationInitializer
  @method moment.initialize
  @param {<a href="http://emberjs.com/api/classes/Ember.Application.html">Ember.Application</a>} application Ember application.
*/
export function initialize(application) {
  [
    'component',
    'controller',
    'model',
    'route',
    'view'
  ].forEach(type => {
    application.inject(type, 'moment', 'service:moment');
  });
}

export default {
  after: 'i18n',
  name: 'moment',
  initialize
};

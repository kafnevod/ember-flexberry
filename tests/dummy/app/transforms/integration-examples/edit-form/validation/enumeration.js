import FlexberryEnumTransormation from 'ember-flexberry-data/transforms/flexberry-enum';
import Enumeration from '../../../../enums/integration-examples/edit-form/validation/enumeration';

export default FlexberryEnumTransormation.extend({
  enum: Enumeration
});

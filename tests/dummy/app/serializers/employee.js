import DS from 'ember-data';
import ApplicationSerializer from '../serializers/application';

// TODO: ODataSerializer.extend
export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    employee1: { serialize: 'records', deserialize: 'records' },
    orders: { serialize: false, deserialize: 'records' }
  },

  primaryKey: 'EmployeeID'
});

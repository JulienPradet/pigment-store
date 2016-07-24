import PigmentStore from 'pigment-store'
import NumberField from '../../../src/components/form/NumberField'

export default PigmentStore.React.describe('Number Field', NumberField)
  .feature(
    'Default number field',
    { value: 'value', name: 'name' }
  )

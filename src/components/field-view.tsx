import { Field } from "../types/field";
import OptionsField from "./field-types/options-field";
import TextField from "./field-types/text-field";
import BooleanField from "./field-types/boolean-field";
import TrafficLightField from "./field-types/traffic-light-field";
// import DateField from './field-types/date-field';
// import LongTextField from './field-types/longText-field';
// import MultilineTextField from './field-types/multilineText-field';
// import ComboListField from './field-types/comboList-field';
// import TimeField from './field-types/time-field';
// import ColorField from './field-types/color-field';
// import ColorPickerField from './field-types/colorPicker-field';
// import NumberField from './field-types/number-field';
// import RatingField from './field-types/rating-field';
// import UserField from './field-types/user-field';
// import ChipsField from './field-types/chips-field';
// import OptionsListField from './field-types/optionsList-field';

interface Props {
  field: Field;
  value: any;
  onChange: (value: any) => void;
}

const FieldView: React.FC<Props> = ({ field, value, onChange }) => {
  switch (field.type) {
    case "text":
      return <TextField value={value} field={field} onChange={onChange} />;
    case "options":
      return <OptionsField value={value} field={field} onChange={onChange} />;
    case "boolean":
      return <BooleanField value={value} field={field} onChange={onChange} />;
    case "traffic-light":
      return (
        <TrafficLightField value={value} field={field} onChange={onChange} />
      );
    // case 'date':
    //   return <DateField value={value} />;
    // case 'long-text':
    //   return <LongTextField value={value} />;
    // case 'multiline-text':
    //   return <MultilineTextField value={value} />;
    // case 'combo-list':
    //   return <ComboListField value={value} />;
    // case 'time':
    //   return <TimeField value={value} />;
    // case 'color':
    //   return <ColorField value={value} />;
    // case 'color-picker':
    //   return <ColorPickerField value={value} />;
    // case 'number':
    //   return <NumberField value={value} />;
    // case 'rating':
    //   return <RatingField value={value} />;
    // case 'user':
    //   return <UserField value={value} />;
    // case 'chips':
    //   return <ChipsField value={value} />;
    // case 'options-list':
    //   return <OptionsListField value={value} options={field.options || []} />;
    default:
      return <TextField value={value} field={field} onChange={onChange} />;
  }
};

export default FieldView;

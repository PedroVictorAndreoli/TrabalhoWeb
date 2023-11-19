import { Edit, SimpleForm, TextInput, required } from 'react-admin';

export function LoginPage() {
  return (
  <>
  <p>AAAAA</p>
  <Edit>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} fullWidth />
            <TextInput source="teaser" validate={[required()]} defaultValue="Lorem Ipsum" multiline fullWidth />
        </SimpleForm>
    </Edit>
  </>);
}


import styled from 'styled-components';
import Layout from '../../../BaseLayout/common/Layout';

const Container = styled.div`
  background-color: #f8f9fa;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-transform: uppercase;
  margin-bottom: 1em;
`;

const Form = styled.form`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #000;
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const TextArea = styled.textarea.attrs(props => ({
  rows: props.rows || 5,
}))`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`;

const ContactInfo = styled.div`
  margin-top: 20px;
  text-align: center;
  margin: 0 auto;
  
`;

const Address = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const Email = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;

const PhoneNumber = styled.p`
  font-weight: bold;
`;

const GoogleMap = styled.iframe`
  width: 100%; 
  height: 500px;
  border: none;
  border-radius: 5px;
  margin: 20px auto;
`;




const Contact = () => {
  return (
    <Layout>
    <Container>
      <ContentWrapper>
        <Title>Contact Us</Title>
        <Form>
          <FormGroup>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" name="email" required />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" required />
          </FormGroup>
          <SubmitButton type="submit">Submit</SubmitButton>
        </Form>

        <ContactInfo>
          <Address>123 Main Street, Cityville, Country</Address>
          <Email>info@example.com</Email>
          <PhoneNumber>+1 (123) 456-7890</PhoneNumber>
          <GoogleMap
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12345.678901234567!2d-73.98765432109876!3d40.741112233445566!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x87654321fedcba98!2sYour%20Business%20Name!5e0!3m2!1sen!2sus!4v1624989898765!5m2!1sen!2sus"
            title="Google Map"
            loading="lazy"
          ></GoogleMap>
        </ContactInfo>
      </ContentWrapper>
    </Container>
    </Layout>
  );
};

export default Contact;

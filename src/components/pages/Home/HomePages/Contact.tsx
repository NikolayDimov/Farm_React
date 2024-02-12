import styled from "styled-components";

const Container = styled.div`
    /* background-color: #f8f9fa; */
    width: 100%;
    max-width: 1200px; /* Set a max-width to limit the width */
    margin: 0 auto; /* Center the container */
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

const TextArea = styled.textarea.attrs((props) => ({
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
    width: 700px;
    height: 500px;
    border: none;
    border-radius: 5px;
    margin: auto;
`;

const Contact = () => {
    return (
        <>
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
                        <Address>123 Main Port, Varna, Bulgaria</Address>
                        <Email>info@example.com</Email>
                        <PhoneNumber>+359 (123) 456-7890</PhoneNumber>
                        <GoogleMap
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d38005.71174407845!2d27.918253009488133!3d43.21863228930401!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbg!4v1707318749225!5m2!1sen!2sbg"
                            title="Google Map"
                            loading="lazy"
                        ></GoogleMap>
                    </ContactInfo>
                </ContentWrapper>
            </Container>
        </>
    );
};

export default Contact;

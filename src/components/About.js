import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';

const About = () => {
    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    About CONNECT: Bridging Minds
                </Typography>
                <Typography variant="body1" paragraph>
                    CONNECT: Bridging Minds is an innovative platform designed to help clients and therapists find each other online and schedule meetings efficiently. Our mission is to bridge the gap between those seeking mental health support and the professionals who provide it.
                </Typography>
                <Typography variant="body1" paragraph>
                    Whether you are looking for therapy, counseling, or mental health advice, CONNECT: Bridging Minds is here to make the process seamless and convenient.
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                    Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                    At CONNECT: Bridging Minds, we believe that everyone deserves easy access to mental health resources. Our platform is designed to facilitate connections between clients and therapists, making it simpler for individuals to get the help they need.
                </Typography>
                <Typography variant="h5" component="h3" gutterBottom>
                    Why Choose Us?
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" component="h4" gutterBottom>
                                Ease of Use
                            </Typography>
                            <Typography variant="body2">
                                Our user-friendly interface ensures that finding and scheduling with a therapist is as easy as possible.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" component="h4" gutterBottom>
                                Verified Therapists
                            </Typography>
                            <Typography variant="body2">
                                We verify the credentials of all therapists on our platform, ensuring you receive professional and reliable care.
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" component="h4" gutterBottom>
                                Secure & Private
                            </Typography>
                            <Typography variant="body2">
                                Your privacy is our priority. Our platform uses advanced security measures to protect your personal information.
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 4 }}>
                    Our Team
                </Typography>
                <Typography variant="body1" paragraph>
                    Our dedicated team of professionals is committed to providing you with the best possible service. We are passionate about mental health and strive to make a positive impact in the community.
                </Typography>
                <Typography variant="body1" paragraph>
                    If you have any questions or need assistance, please don't hesitate to contact us.
                </Typography>
            </Box>
        </Container>
    );
};

export default About;

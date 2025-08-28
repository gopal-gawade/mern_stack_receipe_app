import { Box, Button, Card, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { CenterColDiv } from "../assets/styles/Styles";

const Form = () => {
    const {
        register,
        trigger,
        formState: { errors },
    } = useForm();

    const onSubmit = async (e) => {
        const isValid = await trigger();
        if (!isValid) {
            e.preventDefault();
        }
    };

    return (
        <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
            <form
                target="_blank"
                onSubmit={onSubmit}
                method="POST"
                action={`${import.meta.env.VITE_EMAIL_KEY}`}
            >
                <Card>
                    <CenterColDiv>
                        <Typography variant="h5" sx={{ fontWeight: 600, my: 2 }}>
                            Let's stay in Touch!
                        </Typography>

                        <TextField
                            size="small"
                            fullWidth
                            type="text"
                            placeholder="Name"
                            {...register("name", {
                                required: true,
                                maxLength: 100,
                            })}
                        />

                        <Typography variant="body2" sx={{ color: "#FF3B30" }}>
                            {errors.name && (
                                <Typography variant="caption">
                                    {errors.name.type === "required" && "This field is required."}
                                    {errors.name.type === "maxLength" &&
                                        "Max length is 100 char."}
                                </Typography>
                            )}
                        </Typography>
                        <br />

                        <TextField
                            size="small"
                            fullWidth
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: true,
                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            })}
                        />

                        <Typography variant="body2" sx={{ color: "#FF3B30" }}>
                            {errors.email && (
                                <Typography variant="caption">
                                    {errors.email.type === "required" &&
                                        "This field is required."}
                                    {errors.email.type === "pattern" && "Invalid email address."}
                                </Typography>
                            )}
                        </Typography>
                        <br />

                        <TextField
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Message"
                            type="text"
                            {...register("message", {
                                required: true,
                                maxLength: 2000,
                            })}
                        />

                        <Typography variant="body2" sx={{ color: "#FF3B30" }}>
                            {errors.message && (
                                <Typography variant="caption">
                                    {errors.message.type === "required" &&
                                        "This field is required."}
                                    {errors.message.type === "maxLength" &&
                                        "Max length is 2000 char."}
                                </Typography>
                            )}
                        </Typography>
                        <br />

                        <Button type="submit" sx={{ mb: 2 }}>
                            Send a message
                        </Button>
                    </CenterColDiv>
                </Card>
            </form>
        </Box>
    );
};

export default Form;

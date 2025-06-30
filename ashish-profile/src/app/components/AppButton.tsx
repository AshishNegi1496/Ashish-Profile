import Button, { ButtonProps } from "@mui/material/Button";
import { forwardRef } from "react";

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(function AppButton(
    { children, fullWidth = false, sx, ...props },
    ref
) {
    return (
        <Button
            ref={ref}
            variant="contained"
            color="primary"
            disableElevation
            fullWidth={fullWidth}
            sx={{
                bgcolor: "#0c7ff2",
                color: "#fff",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.1rem" },
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: "none",
                width: "fit-content",
                boxShadow: 2,
                mt: 1,
                "&:hover": { bgcolor: "#095ec0" },
                ...sx,
            }}
            {...props}
        >
            {children}
        </Button>
    );
});

export default AppButton;
import Button, { ButtonProps } from "@mui/material/Button";
import { forwardRef } from "react";

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(function AppButton(
  { children, fullWidth = false, variant = "contained", sx, ...props },
  ref
) {
  const isOutlined = variant === "outlined";

  return (
    <Button
      ref={ref}
      variant={variant}
      color="primary"
      disableElevation
      fullWidth={fullWidth}
      sx={{
        bgcolor: isOutlined ? "transparent" : "#0c7ff2",
        color: isOutlined ? "#0c7ff2" : "#fff",
        border: isOutlined ? "2px solidrgb(6, 48, 90)" : "none",
        fontWeight: 700,
        fontSize: { xs: "1rem", md: "1.1rem" },
        borderRadius: 2,
        px: 4,
        py: 1.5,
        textTransform: "none",
        width: "fit-content",
        boxShadow: isOutlined ? 0 : 2,
        mt: 1,
        "&:hover": {
          bgcolor: isOutlined ? "rgba(12, 127, 242, 0.1)" : "#095ec0",
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

export default AppButton;

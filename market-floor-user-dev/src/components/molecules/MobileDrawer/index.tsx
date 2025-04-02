"use client";

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";

interface IMobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<IMobileDrawerProps> = (props) => {
  const { open, onClose } = props;

  const toggleDrawer =
    (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      if (inOpen) {
        onClose();
      }
    };

  return (
    <Drawer open={open} onClose={() => onClose()}>
      <Box
        sx={{ width: "300px" }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {["Quản lý tài khoản", "Giỏ hàng"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>{text}</ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Đăng xuất"].map((text) => (
            <ListItem key={text}>
              <ListItemButton>{text}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MobileDrawer;

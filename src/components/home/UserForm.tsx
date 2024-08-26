import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button } from "@mui/material";
import { userSchema, UserModel } from "../rules/rules"; // Update the import path if necessary
import { useUserStore } from "../../store/user";
import { errorNotification } from "../notifications/notifications";
import { useEffect } from "react";
import { UserUpdateDto } from "../types/UserUpdateDto";
import { UserDto } from "../types/UserDto";

export default function UserForm() {
  const { sendAddNewUser, resetItem, item, sendUpdateUser } = useUserStore();
  //   console.log(item);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<UserModel>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: item?.name ?? "",
      phone: item?.phone ?? "",
      email: item?.email ?? "",
      date_of_birth: item?.date_of_birth ?? "",
      address: item?.address ?? "",
    },
  });

  useEffect(() => {
    if (item) {
      setValue("name", item.name);
      setValue("phone", item.phone);
      setValue("email", item.email);
      setValue("date_of_birth", item.date_of_birth);
      setValue("address", item.address);
    }
  }, [item]);

  const onSubmit = async (data: UserDto) => {
    try {
      if (item) {
        const payload: UserUpdateDto = {
          id: item?.id,
        };
        if (data.name !== item.name) {
          payload.name = data.name;
        }
        if (data.phone !== item.phone) {
          payload.phone = data.phone;
        }
        if (data.email !== item.email) {
          payload.email = data.email;
        }
        if (data.date_of_birth !== item.date_of_birth) {
          payload.date_of_birth = data.date_of_birth;
        }
        if (data.address !== item.address) {
          payload.address = data.address;
        }
        console.log(Object.keys(payload));

        if (Object.keys(payload).length > 1) {
          await sendUpdateUser(payload);
        }
      } else {
        await sendAddNewUser(data);
      }
      reset();
      resetItem();
    } catch (error) {
      console.error("Error adding user:", error);
      errorNotification(`Error adding user`);
    }
  };

  const onCancel = () => {
    reset();
    resetItem();
  };

  return (
    <section className="myContainer my-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between flex-wrap lg:gap-14 md:gap-8 gap-5"
      >
        <div className="flex-grow my-5 grid lg:grid-cols-3 sm:grid-cols-2  grid-cols-1 gap-4 mb-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="date_of_birth"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                error={!!errors.date_of_birth}
                helperText={errors.date_of_birth?.message}
                {...field}
              />
            )}
          />
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Address"
                multiline
                // rows={"auto"}
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address?.message}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex sm:flex-col justify-center gap-4 max-sm:w-full">
          <Button
            className="max-h-14"
            size="large"
            type="submit"
            variant="contained"
            color="primary"
          >
            Save
          </Button>
          <Button
            className="max-h-14"
            size="large"
            variant="outlined"
            color="primary"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </form>
    </section>
  );
}

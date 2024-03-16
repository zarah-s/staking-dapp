import { Button, Dialog, Flex, TextField } from "@radix-ui/themes";
interface Props {
  open: boolean;
  title: string;
  description: string;
  onChange: () => void;
  onConfirm: () => void;
  onChangeInput: (value: string) => void;
}
const InputDialog = ({
  onChange,
  open,
  onConfirm,
  title,
  onChangeInput,
  description,
}: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      <Dialog.Content
        style={{ maxWidth: 450, background: "#2D2C43", color: "#fff" }}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {description}
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <TextField.Input
              onChange={(e) => onChangeInput(e?.target?.value.trim())}
              placeholder="pool reward rate"
              style={{
                border: "1px solid rgba(255,255,255,.5)",
                background: "#2D2C43",
                color: "#fff",
              }}
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={onChange} variant="soft" color="blue">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onConfirm} className="bg-blue-400">
              Proceed
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default InputDialog;

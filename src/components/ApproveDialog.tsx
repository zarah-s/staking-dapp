import { Button, Dialog, Flex } from "@radix-ui/themes";
interface Props {
  open: boolean;
  onChange: () => void;
  onConfirm: () => void;
}
const ApproveDialog = ({ onChange, open, onConfirm }: Props) => {
  return (
    <Dialog.Root open={open} onOpenChange={onChange}>
      <Dialog.Content
        style={{ maxWidth: 450, background: "#2D2C43", color: "#fff" }}
      >
        <Dialog.Title>Approve</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Approve contract to spend token?
        </Dialog.Description>

        {/* <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Receiver's Address
            </Text>
            <TextField.Input
              // ref={inputRef}
              placeholder="Receiver's address"
            />
          </label>
        </Flex> */}

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={onChange} variant="soft" color="blue">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button onClick={onConfirm} className="bg-blue-400">
              Approve
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ApproveDialog;

import { Alert, Button, Link } from "@heroui/react";

export default function UnderMaintenance() {
  const description = () => {
    return (
      <p>
        Oops, this page is under maintenance, please come back later...
      </p>
    );
  };
  return (
    <div className="flex flex-col items-end justify-center gap-4">
      <Alert
        color="warning"
        description={description()}
        title="Under Maintenance"
      />
      <Button color="danger" size="sm" variant="flat" as={Link} href="/">
        Go back to home
      </Button>
    </div>
  );
}

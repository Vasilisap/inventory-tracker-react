export function formatDate(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function getDisplayName(user) {
  if (!user) return;

  if (user.user_metadata?.full_name) {
    return user.user_metadata.full_name;
  }

  if (user.email) {
    const baseName = user.email.split("@")[0];
    if (!baseName) return "";
    return baseName.charAt(0).toUpperCase() + baseName.slice(1);
  }

  return "";
}

export function formatStatus(status) {
  if (!status) return "Unknown";

  return status
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getStatusVariant(status) {
  switch (status) {
    case "available":
      return "green";
    case "in_use":
      return "blue";
    case "repair":
      return "amber";
    case "retired":
      return "red";
    default:
      return "gray";
  }
}

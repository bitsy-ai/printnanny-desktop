import { useAccountStore } from "../stores/account";

function isAuthenticated(): boolean {
  const account = useAccountStore();
  return account.isAuthenticated;
}

export { isAuthenticated };

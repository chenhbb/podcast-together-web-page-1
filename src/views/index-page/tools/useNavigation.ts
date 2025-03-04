import type { PtRouter } from "../../../routes/pt-router"

export function useNavigation(router: PtRouter) {
  const navigateToCreate = () => {
    router.push({ name: "create" })
  }

  return {
    navigateToCreate
  }
}
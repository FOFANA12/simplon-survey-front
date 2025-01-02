import { useAuthStore } from "@/store";

export function usePermission() {
  const store = useAuthStore();
  const userPermissions = computed(() =>
    store.user ? store.user.permissions : []
  );

  const hasPermission = (permission) => {
    return true; //userPermissions.value.includes(permission);
  };

  function hasAnyPermission(requiredPermissions) {
    return true;
    
   /* requiredPermissions.some((permission) =>
      userPermissions.value.includes(permission)
    );*/
  }

  return {
    userPermissions,
    hasPermission,
    hasAnyPermission,
  };
}

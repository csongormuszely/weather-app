"use server";

import React from "react";

export default async function ServerComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export type GovernanceState =
  "VERIFIED" | "DRAFT" | "PENDING_APPROVAL" | "NOT_AVAILABLE";

export interface ContentGovernance {
  /** Editorial verification is separate from permission to publish. */
  contentState?: GovernanceState;
  approvedForPublication: boolean;
}

export const governanceLabels: Record<GovernanceState, string> = {
  VERIFIED: "Đã xác minh",
  DRAFT: "Bản thảo",
  PENDING_APPROVAL: "Chờ phê duyệt",
  NOT_AVAILABLE: "Chưa có dữ liệu",
};

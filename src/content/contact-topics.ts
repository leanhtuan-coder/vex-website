export const contactTopics = {
  solution: "Tư vấn giải pháp",
  business: "Hợp tác kinh doanh",
  technology: "Hợp tác công nghệ",
  careers: "Tuyển dụng",
  media: "Truyền thông",
  research: "Hợp tác nghiên cứu",
  academy: "Hợp tác giáo dục",
  other: "Khác",
} as const;

export function topicFromSearch(search: string) {
  const topic = new URLSearchParams(search).get("topic");
  return topic && Object.hasOwn(contactTopics, topic)
    ? contactTopics[topic as keyof typeof contactTopics]
    : contactTopics.solution;
}

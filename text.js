import { prisma } from "./lib/prisma.js";

async function main() {
  // 1. Ek test entry create karna
  const data = await prisma.uploadedData.create({
    data: {
      title: "Test Title",
      content: "This is test content"
    },
  });
  console.log("Saved Data:", data);

  // 2. Sare entries fetch karna
  const allData = await prisma.uploadedData.findMany();
  console.log("All Data:", allData);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

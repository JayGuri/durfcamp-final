import { BlockRenderer } from "@/components/BlockRenderer";
import { getHomePage } from "@/data/loaders";
import { notFound } from "next/navigation";
import { ContentList } from "@/components/layout/ContentList";
import { BlogCard } from "@/components/BlogCard";

async function loader(){
  const data = await getHomePage();
  if (!data) notFound();
  console.log(data);
  return {...data.data};
}


export default async function HomeRoute() {
  const data = await loader();
  const blocks = data?.blocks || [];
  console.log(data);
  return (
      <div>
        <BlockRenderer blocks={blocks} />
        <div className="container">
        <ContentList
          headline="Featured Articles"
          path="/api/articles"
          component={BlogCard}
          featured={true}
        />
    </div>
  </div>  
  );
}

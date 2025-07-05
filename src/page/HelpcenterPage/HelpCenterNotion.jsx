import LoadingComponent from "@/components/loaders/LoadingComponent";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const HelpCenterNotion = () => {
  const axiosPublic = useAxiosPublic();

  const fetchNotionEmbed = async () => {
    const res = await axiosPublic.get("/get-embaded");

    // OPTIONAL: Force iframe to have larger height (e.g., 1500px)
    const updatedIframe = res.data.data.notion.replace(
      /height="[^"]*"/,
      'height="1500"'
    );

    return updatedIframe;
  };

  const {
    data: notionIframe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notion-embed"],
    queryFn: fetchNotionEmbed,
  });

  if (isLoading) {
    return (
      <div className="w-full container min-h-screen flex items-center justify-center">
        <LoadingComponent />
      </div>
    );
  }

  if (isError || !notionIframe) {
    return (
      <div className="w-full container min-h-screen flex items-center justify-center">
        <p>Failed to load Notion content.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div
        className="container min-h-[1500px] h-auto"
        dangerouslySetInnerHTML={{ __html: notionIframe }}
      />
    </div>
  );
};

export default HelpCenterNotion;

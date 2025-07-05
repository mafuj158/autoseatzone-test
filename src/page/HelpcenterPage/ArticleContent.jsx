import { useOutletContext, useParams } from "react-router-dom";
import UserPlaceholder from "@/assets/icons/UserPlaceholder";
import RightSidebar from "@/components/helpcenter/RightSidebar";
import LeaveCommentSection from "@/components/helpcenter/LeaveCommentSection";
import ReviewsSection from "@/components/helpcenter/ReviewsSection";
import useHelpArticleDetailsApi from "@/hooks/helpHooks/useHelpArticleDetailsApi";
import LoadingComponent from "@/components/loaders/LoadingComponent";

const ArticleContent = () => {
    const { categoryId, articleId } = useParams();
    const { helpArticles } = useOutletContext();
     const { data: article, isLoading, isError } = useHelpArticleDetailsApi(categoryId, articleId);
    
    if(isLoading){
        return <div><LoadingComponent/></div>
    }

    return (
        <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6 xl:gap-10">
            {/* Main content */}
            <div className="flex-1">
                <div className="p-4 md:p-6 bg-white rounded-lg shadow-sm">
                    <h1 className="text-xl md:text-2xl xl:text-3xl font-bold mb-4">{article?.question}</h1>

                    <div className="my-4 md:my-5 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682 2" fill="none" className="w-full">
                            <path d="M1 1H681" stroke="black" strokeOpacity="0.25" strokeWidth="0.25" strokeLinecap="square" />
                        </svg>
                    </div>

                    <div className="text-sm text-gray-600 mb-4 flex flex-col sm:flex-row sm:justify-between gap-2">
                        <span className="font-semibold flex items-center gap-2">
                            <UserPlaceholder className="w-5 h-5" />
                            {article.admin?.name || "Admin"}
                        </span>
                        <span className="text-gray-400 text-sm">Updated on {article.admin?.humanize_date || "Unknown date"}</span>
                    </div>

                    <div className="my-4 md:my-5 w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 682 2" fill="none" className="w-full">
                            <path d="M1 1H681" stroke="black" strokeOpacity="0.25" strokeWidth="0.25" strokeLinecap="square" />
                        </svg>
                    </div>

                    <p className="text-gray-700 leading-relaxed text-base md:text-lg">{article.answer}</p>
                    <div >
                        {
                            article?.images.map(item=>
                                <div className="my-4 md:my-10 w-full" key={item?.id}>
                                    <h3 className="text-xl md:text-2xl xl:text-3xl font-bold mb-4">{item?.title}</h3>
                                    <img 
                                    className="mx-auto w-full"
                                    src={item?.image} alt="" />
                                </div>
                            )
                        }
                    </div>
                </div>

                <ReviewsSection comments={article?.comments} />

                <LeaveCommentSection solutionId={article.id} />
            </div>

            {/* Sidebar */}
            <RightSidebar />
        </div>
    );
};

export default ArticleContent;
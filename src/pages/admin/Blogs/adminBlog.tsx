import CreateBlog from "../../../components/admin/Blogs/addblog.tsx";
import BlogCards from "../../../components/admin/Blogs/GetBlog.tsx";
const AdminBlog = ()=>{
    return(
        <div>
            {/* Create Blog */}
            <h2>Create Blogs</h2>
            <CreateBlog/>
            <div>
                <h2>Blogs Posts</h2>
                <BlogCards/>
            </div>
        </div>
    )
}

export default AdminBlog
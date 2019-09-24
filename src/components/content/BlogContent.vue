<script>
import { createNamespacedHelpers } from 'vuex'
import LocationInfo from './LocationInfo.vue'
import NoContent from './NoContent.vue'
import CreatePost from './CreatePost.vue'
import PostContent from './PostContent.vue'

// posts模块
const {
    mapGetters: postGetters,
} = createNamespacedHelpers('posts')

export default {
    computed: {
        ...postGetters([
            'draft',
            'currentPost',
        ]),
        cssClass() {
            return [
                'blog-content',
                {
                    'has-content': this.currentPost,
                }
            ]
        },
    },
    render(h) {
        let Content
        if (!this.currentPost) {
            Content = NoContent
        } else if (this.draft) {
            Content = CreatePost
        } else {
            Content = PostContent
        }
        
        return <div class = {this.cssClass}>
            <LocationInfo />
            <Content />
        </div>
    },
}
</script>

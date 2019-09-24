<template>
    <div class="post-content">
        <template v-if="details">
            <div class="title">
                <img src="details.author.profile.photos[0].value" />
                <span>
                    <span>{{ details.titile }}</span>
                    <span class="info">
                        <span class="name">
                            {{ details.author.profile.displayName }}
                        </span>
                        <span class="date">
                            {{ details.date | date }}
                        </span>
                    </span>
                </span>
            </div>
            <div class="content">{{ details.content }}</div>
            <!-- TODO: 评论 -->
            <div class="actions">
                <button
                    type="button"
                    class="icon-button secondary"
                    @click="unselectPost"
                >
                    <i class="material-icons">close</i>
                </button>
                <!-- TODO: 填写评论 -->
            </div>
        </template>
        <div class="loading-animation" v-else>
            <div></div>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
    mapGetters: postsGetters,
    mapActions: postsActions,
} = createNamespacedHelpers('posts')

export default {
    computed: {
        ...postsGetters({
            details: 'selectedPostDetails',
        }),
    },
    methods: {
        ...postsActions([
            'unselect',
        ]),
    },
}
</script>

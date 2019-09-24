<template>
    <div class="blog-map">
        <GmapMap
            :center="center"
            :zoom="zoom"
            :options="mapOptions"
            @update:center="setCenter"
            @update:zoom="setZoom"
            style="width: 100%; height: 100%;"
        >
            <GmapMarker
                @update:position="setUserPosition"
            />
        </GmapMap>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
    mapGetters,
    mapActions,
} = createNamespacedHelpers('maps')

export default {
    computed: {
        ...mapGetters([
            'center',
            'zoom',
            'userPosition',
        ]),
        mapOptions() {
            return {
                fullscreenControl: false,
            }
        },
    },
    methods: mapActions([
        'setCenter',
        'setZoom',
        'setUserPosition'
    ]),
}
</script>
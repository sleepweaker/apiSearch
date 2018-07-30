<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">method: </span>
                <span class="expand-value">{{ row.method }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">path: </span>
                <span class="expand-value">{{ row.path }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">prj_name: </span>
                <span class="expand-value">{{ row.prj_name }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="24">
                <span class="expand-key">scheme: </span>
                <span class="expand-value">{{ row.scheme }}</span>
            </Col>
            <!-- <Col span="8">
                <span class="expand-key">Favorite movie: </span>
                <span class="expand-value">{{ row.movie }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">Favorite music: </span>
                <span class="expand-value">{{ row.music }}</span>
            </Col> -->
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>
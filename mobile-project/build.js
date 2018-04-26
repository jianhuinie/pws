/**
 * Created by bjhl on 15/12/1.
 * @params -s 环境变量dev/beta
 * @params -d delta缩写 是否包含sap，1: seo和spa一起增量构建，0: spa独立构建
 * @params -t total缩写 是否全量构建，1: 全量，0: 增量。不传默认全量
 * @params -p pre_commit_id缩写，total = 0起作用，上一个构建commit id
 * @params -l last_commit_id缩写，total = 0起作用，最新构建commit id
 */
require('./_build/builder').build();
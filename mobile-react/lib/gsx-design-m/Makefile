# 示例：make dev desc=重构代码
export desc
export envName
server:
	edp webserver start
dev:
	sh ci.sh dev $(desc)
test:
	sh ci.sh test $(desc)
beta:
	sh ci.sh test $(desc)
feature:
	sh ci.sh feature-merge $(desc)
master:
	sh ci.sh master $(desc)

.PHONY: beta dev test feature master dev-hanrui
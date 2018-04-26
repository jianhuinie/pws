# 示例：
# make dev desc=重构代码
export desc
server:
	edp webserver start
feature:
	sh ci.sh feature-hanrui-findTeacher $(desc)
test:
	sh ci.sh test $(desc)
m-test:
	sh ci.sh m-test $(desc)
beta:
	sh ci.sh beta $(desc)
release:
	sh ci.sh release_20160927 $(desc)
bugfixed:
	sh ci.sh bugfixed-hanrui-i $(desc)
master:
	sh ci.sh master $(desc)

.PHONY: feature test m-test beta master bugfixed hanrui server
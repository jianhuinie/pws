# @file 直接push代码的简写方式
# @author hurry
# 示例：
# make dev desc=重构代码
export desc
server:
	edp webserver start
feature:
	sh ci.sh njh-0706-phone $(desc)
dev:
	sh ci.sh hsm-orgDetail-1024 $(desc)
bugfixed:
	sh ci.sh bugfixed-hurry-backTop $(desc)
test:
	sh ci.sh test $(desc)
m-test:
	sh ci.sh m-test $(desc)
release:
	sh ci.sh release_20160728 $(desc)
master:
	sh ci.sh master $(desc)


.PHONY: feature dev bugfixed test m-test beta master qa hanrui server

# 示例：
# make dev desc=重构代码
export desc
dev:
	sh ci.sh dev $(desc)
njh:
	sh ci.sh njh-0330-one2one $(desc)
feature:
	sh ci.sh feature-hurry-https $(desc)
bugfixed:
	sh ci.sh bugfixed-hurry-upload $(desc)
test:
	sh ci.sh test $(desc)
beta:
	sh ci.sh beta $(desc)
master:
	sh ci.sh master $(desc)
debugger:
	open http://172.26.251.157:8888/client/\#hanyangecho; \
	weinre --boundHost 172.26.251.157 --httpPort 8888;
vorlon:
	open http://localhost:1337/dashboard/default \
	vorlon

.PHONY: dev test beta master debugger baijia feature
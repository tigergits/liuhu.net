---
title: DDK 学习经验
description: DDK 学习经验
slug: wz_compu2
canonical: https://www.liuhu.net/lhwz/wz_compu2.htm
date: 2004-05-10
---


转载　辅大美少女梦工场　BBS　站(bbs.cs.ccu.edu.tw)

从　97　年　1　月　我在　Program　版　Post　鼓励有心网友学习　Window　Device　Driver　以来,　陆续收到一些人询问如何下手.　现在我已没时间玩　BBS,　因除了　3D　显示卡　Driver　要　Tune　外,还被派去做一些杂　7　杂　8　的事情.　趁教师节比较有空,写下这封我学习　DDK　的经验,　如果那站的站主觉得对网友有帮助,　就尽管利用,　不用客气.　但需注明出处,　并严禁有任何谋利举动(如剽窃修改後,　来赚取稿费),　曾对一些网友提出如何在MFC　中用　I/O　Port　Function　的问题,　回答了　6　次,　让我觉得很烦烦烦烦烦烦.　希望这种情况不在发生.

本文供分　3　段:　(1)　为何我要学　DDK　(2)　学习　DDK　的过程　(3)未来可能的发展.

## (1) 为何我要学 DDK

我是资讯科班出身,　就读过交大计工,　清大资研.　历经　78,79　股市狂飚,　退伍後,认为写程式没什麽前途,　也无法撑到　38　岁.　但　MBA　却是越老人脉越多,　收入也越多,　所以进资策会,　一面工作　一面准备　GMAT,　但没申请到理想的学校,而考外贸协会的人才培训班,　在复试时也被刷下来.　最後认命乖乖学Window　3.1,

第一年做多媒体资料库专案,　当时连　VC++　1.0　都还没出现.　就用　Borland　C++　3.0以纯　SDK　方式　coding,(因不知道有　OWL　这种东西)　事後想起来真是因祸得福,让我更了解　Window　底层的运作　(不过当时真的觉得很干).

第二年做　Video　Editor　是我比较快乐的时光,　VC++　1.0　刚出来,　但市面没一本相关书籍,　连　MSDN　也一样.　怎麽办?　到处找不到资料.　最後用最笨的方法:用　Debuger　trace　MFC　source　code!　然後搭配　Video　for　Window　1.1　版　SDK　来coding,　当时傻傻得,　以为可以做个　Video　Editor　跟友立拼,　所以常常加班到　10　点,　但後来　Video　Editor　结案後就放到储藏室,　而　Aldus　被　Adobe　并购,　友立也把　PhotoStyle　卖给　Adobe.　这件事件让我得到个教训:　套装软体不好做,　更难与国际大厂同类型产品竞争.

因有时　Video　Editor　会利用　MCI　Command　来控制　AVI/FLI　播放,　但觉得很奇怪,　那个　MCI　Driver　到底在搞什麽鬼?　在好奇心驱使下,　翻　MSDN　的　MultiMedia　Device　Driver　来看,　才搞懂　MCI　Driver　如何与底层的　Video/Audio　Driver　沟通.

第三年是最黑暗的时期,　Team　Leader　包个　Multimedia　Title　来做(还曾打算向敦煌科技包　Game　来做).　美工,　企划,　全和在一起,　而要我用Director　3.0　的　Lingo　语言来写　Title　的　Program.　我便开始消极抵抗,　同时自己偷偷用　MFC　+　WinG　+　32　Bit　Assembly　在　Win　3.1　上写个类似　Director　3.0　的　Engine.　UI　及　绘图引擎都完成,　而且播放速度比　Director　3.0　还快.　但卡在不知道如何设计　Script　及　Interpreter.　最後只好做罢.然而转捩点就发生在这一年:应台北电脑工会之邀,　开门　"Windows　影音驱动程式剖析"　课程而与童子贤先生有一面之缘(当副总的他竟跑来上我这无名小卒的课),　也保留他一张名片.　另外帮别人写　Motion　Control　Card　的　Dos　Driver　来用在　CNC　上,　对　Driver　开始发生兴趣,　原来写　Driver　的利润颇丰.

第四年,　黑暗的日子终於过去.　叁与　IBM　VisualAge　for　Basic　的　Visual　Component　开发,　用　VisualAge　for　C++　3.0　来　coding,　过了一段无任何相关资料的日子,　还好从李维那拿到　OpenClass　source　code,　发挥　tracing　的精神,　终於顺利结案.　这年在某电脑展中遇上任职　IBM　的大学同学,　被他讥笑还在米仓中当米虫,　让我心理不好受.　也使我思考,　只会　coding　的我未来要何去何从,　难道要过着一年换一个专案的日子吗?　然後　40　岁时会变成怎样　?( PetShop　Boy　的　"　Being　Borning"　在我脑中响起…)

幸好碰上一个影响我很大的同事,　他那时也刚帮人写完一个　Window　95　的　VxD,　於是向他讨教,　并学得如何收集相关资料,　练好後就接个　A/D　D/A　卡的　Win31/95　Driver　CASE　来做,　写完　Win95　觉得不过瘾,　便拿　NT　4.0　DDK　来看.　另外他有事没事拿　ASIS　电子周刊给我看,　当时正报导　PC97　的　specification:　ACPI,　AGP,　OnNow等新技术,　我看完就知道大好机会来了.　凭做　A/D　D/A　卡　Window　Driver　的经验,　我知道随着　Win95　的普及,　这些硬体卡没有　Win95　Driver　根本很难卖到欧美.　PC97　规定了　Intel　的硬体设计如何跟　Microsoft　的　Window　做结合,　而介面就是　Window　Driver!　加上主机板厂养的软体工程师只会写　BIOS　or　8051,　对　Window　Driver　根本是听都没听过,　但　PC97,　98　是必走的道路,　所以一定要找到会的人来做.

而这时候我又要换另一资料库相关的专案(我最讨厌做　MIS,　成天与数据,　报表奋战,有够无聊).　於是上网路找工作,　想到手头的童子贤名片,　就试投华硕看看.　没想到一试便上,　(不过在面试时被嫌在资策会待太久,　恐染上不良习性).　进华硕後,　感觉到是　Right　Man　in　Right　Place.　终於可以一展抱负,　有明确的目标,　不再虚度时光,　也不会被别人嘲笑是米虫.　更重要的是有成就感,　想想做的专案,　是要卖到全世界的产品,　而且是与一些国际大厂竞争产品上市时间.　再也不是作完往仓库一摆的东西.　再者华硕目前员工人数少,　业务扩展迅速,　加上公司高级领导阶层非常重视研发实力,　只要有能力的人,　不怕没升迁机会.　不像宏基已有太多员工,　没什麽表现能力的机会,　且升迁管道太挤了.

## (2) 学习 DDK 的过程

要学　DDK　首先要把　Window　的底层基础练的扎实.　但一般人对学　Window　SDK　都视为畏途,　更何况是底层的东西.　从　Win31　到　Win95　变化比较多得,　我个人认为是:　Multitasking,　Plug&Play,　Memory　Addressing.　有人问我说,　Memphis　都快出来,　还要花功夫看　Win95　or　Win31　吗?　我认为还是要!　原因是:

a.　Memphis　不是完全重新改写,　理面的一些观念还是沿用　Win95.

B.　目前市面上尚未有大师级的　Memphis　相关书籍,　如果有也只是趁火打劫类型的书,　而台湾的书商,　作者最会搞这种把戏来　A　钱.　如　Win31/95　方面已有一些大师的书籍,　如　Andrew　Scrullman,　Patt　Metrick,　Richard　Jeffery,　Walter　O'ney,　Charle　Patzold　等大师.　你不去看大师级的书,　反而去看　"快快乐乐学　Memphis",　"教你　21　天学会　Memphis"　这类垃圾书,　真是在浪费你的时间及金钱.

学　DDK　的第一步准备功夫是把英文阅读能力练好,　你别指望书商会出中译本.　因这类书的卖相太差,　比不上　VB,　Delphi,　JAVA这类较大众化的书.　再者要找到够格的译者很难.　要译好是要花相当时间,　那还到不如去写些轻松的书,　稿费也赚得多.

接下来就要练基础工夫,　如同张无忌花了　6　年时间练好九阳真经,　等到练乾昆大挪移时只花数个时辰就　OK.　要如何练底层基础呢　?　勤看书,　勤　coding　及　Trace　别人写得　sample　code而已.　即使是　天才型的　Programmer　也是要看书,　因　Window　不是他设计的,　必须了解　Window　才有办法下手.　而非像写　Algorithm　方面的论文般,　自己定　assumption,　Lemma,　导出　Theme,　下　conclusion　就完成.所以一些刚入社会的研究生最好先调整自己的心态.

以往我是读一些大师级的书,　如:

"Window　Programing"　的　Charle　Petzold

"Undocument　Window"　系列的　Andrew　Scullman,

"Win95　system　Programming　Secrets"　的　Matt　Pietrek,

"Advanced　Windows"　的　Jeffery　Richter

期刊的话是:

Microsoft　System　Journal,

Doctor　Dobb's　Journal,

Window　Developer　Journal.　这本期刊是我认为学　DDK　的人必要订阅的!　几乎过个　1,　2　期就会刊登　Window　Device　Driver　相关的文章,　而且里面有位　Paula　女士主持的　NT　专栏,　写的很深入,　不是市面一些标榜　NT　"大剖析"之类的书籍所能比拟.　在　Andrew　Scrullman　的　"Undocument　NT"　尚未问世之前,它是我觉得最有深度的专栏.

接下来就谈与　Driver　有直接关系的资料:

Device　Driver　的书籍,　我从　Win31　开始说起:

"Writing　Windows　Device　Driver　and　VxD",　Karen　Hazzen,　第　1,2　版　是最适合写　Win31　Driver　的叁考书籍.　也有一本白皮的　"Writing　Window　Device　Driver",　我认为它的叁考性很低,　因它光抄　Win31　DDK　Function　Description　就花了　50　～　60　几页,　有　A　钱之嫌.

Win95:

那当然是首推　"System　Programing　for　Win95",　Walter　Oney　这本巨作.　我曾因翻Chapter　11　～　13　翻到书页掉落,　而重新再买一本.　Walter　Oney　既出,　谁与争锋.有这本就够了!　也没有人有胆来挑战他.

WinNT:

唯一的一本:　"The　NT　Device　Driver　Book",　Art　Baker.　很有系统的一步一步介绍如何写　NT　Kernal　mode　driver.　先看这本书然後再看　MS　的　NT　DDK　on　Help　会让你较容易了解.　当初没这本书时,　我刚开始看　DDK　Help　是看得满头雾水.　最好搭配　"Inside　Windows　NT",　Helen　Custer　一起看,　因为　NT　底层已经导入　Object　Oriented　观念(WDM　是将　NT　Kernel　mode　driver　加装　Plug&Play　及　Bus　handle　等新功能),　与　Win95　的　Virtual　Machine　观念　相差甚远.　这本书虽是　1992　年出版,　但有对　NT　的核心运作加以介绍,　也是一本难得的好书.

NewGroup　and　Web　Site:

1.　Win95　是　comp.os.ms
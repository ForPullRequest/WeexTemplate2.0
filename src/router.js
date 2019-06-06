/**
 * Created by zwwill on 2017/8/29.
 */
import Router from 'vue-router'
// const Index = () => import('./index.vue')
// const viewBlApplyIndex = () => import('./view/blApply/index.vue')
// const viewBlApplyBlApply = () => import('./view/blApply/blApply.vue')
// const viewBlApplyBlApplyNext = () => import('./view/blApply/blApplyNext.vue')
// const viewBlApplyBlApplyBlType = () => import('./view/blApply/blType.vue')
// const viewBlApplyBlApplyEditAddress = () => import('./view/blApply/editAddress.vue')


// const viewBlApplyBlApplyOftenAddress  = () => import( './view/blApply/oftenAddress.vue')
// const viewBlApplyBlApplySelectItem  = () => import( './view/blApply/selectItem.vue')
// //
// const viewCommonCaseHistoryIndex  = () => import( './view/commonCaseHistory/index.vue')
// const viewCommonCaseHistoryDetail = () => import( './view/commonCaseHistory/detail.vue')
// const viewCommonCaseHistoryLookCaseHistory = () => import( './view/commonCaseHistory/lookCaseHistory.vue')
// //
// const viewCommonDraftIndex  = () => import( './view/commonDraft/index.vue')
// //
// const viewCommonMainIndex  = () => import( './view/commonMain/index.vue')
// //
// const viewCommonPayIndex  = () => import( './view/commonPay/index.vue')
// const viewCommonPayPayFail  = () => import( './view/commonPay/payFail.vue')
// const viewCommonPayPayQrCode  = () => import( './view/commonPay/payQrCode.vue')
// const viewCommonPayPaySuccess  = () => import( './view/commonPay/paySuccess.vue')
// //
// const viewCommonSelectDiagIndex  = () => import( './view/commonSelectDiag/index.vue')
// //
// const viewCommonSelectProIndex  = () => import( './view/commonSelectPro/index.vue')
// const viewCommonSelectProIndex1  = () => import( './view/commonSelectPro/index1.vue')
// const viewCommonSelectProIndex2  = () => import( './view/commonSelectPro/index2.vue')
// const viewCommonSelectProDetail  = () => import( './view/commonSelectPro/detail.vue')
// //
// const viewCommonWaitPayIndex  = () => import( './view/commonWaitPay/index.vue')
// //
// const viewDetailBlDiagIndex  = () => import( './view/detail/blDiag/index.vue')
// const viewDetailCaseDetailIndex  = () => import( './view/detail/caseDetail/index.vue')
// const viewDetailCommonEvaluateIndex  = () => import( './view/detail/commonEvaluate/index.vue')
// const viewDetailCommonRefuseIndex  = () => import( './view/detail/commonRefuse/index.vue')
// const viewDetailCommonReportDetailIndex  = () => import( './view/detail/commonReportDetail/index.vue')
// const viewDetailhzDiagHzDiagIndex  = () => import( './view/detail/hzDiag/index.vue')
// const viewDetailhzDiagHzReportDetailIndex  = () => import( './view/detail/hzReportDetail/index.vue')
// const viewDetailhzDiagMzDetailIndex  = () => import( './view/detail/mzDetail/index.vue')
// const viewDetailhzDiagMzReportDetailIndex  = () => import( './view/detail/mzReportDetail/index.vue')
// const viewDetailhzDiagMzReportDetailEvaluate  = () => import( './view/detail/mzReportDetail/evaluate.vue')
// const viewDetailhzDiagYxDiaglIndex  = () => import( './view/detail/yxDiag/index.vue')
// //
// const viewHzApplyIndex  = () => import( './view/hzApply/index.vue')
// const viewHzApplyApplyType  = () => import( './view/hzApply/applyType.vue')
// const viewHzApplyApplyBaseInfo  = () => import( './view/hzApply/baseInfo.vue')
// const viewHzApplyApplyConsultInfo  = () => import( './view/hzApply/consultInfo.vue')
// //
// const viewMzApplyIndex  = () => import( './view/mzApply/index.vue')
// const viewMzApplyIndex1  = () => import( './view/mzApply/index1.vue')
// const viewMzApplyIndex2  = () => import( './view/mzApply/index2.vue')
// const viewMzApplyCompleted  = () => import( './view/mzApply/completed.vue')
// const viewMzApplySubmitApply  = () => import( './view/mzApply/submitApply.vue')
// //
// const viewMzArrangeIndex  = () => import( './view/mzArrange/index.vue')
// //
// const viewMzDiagIndex  = () => import( './view/mzDiag/index.vue')
// const viewMzDiagCheck  = () => import( './view/mzDiag/check.vue')
// const viewMzDiagChinaMed  = () => import( './view/mzDiag/chinaMed.vue')
// const viewMzDiagChinaMedHandle  = () => import( './view/mzDiag/chinaMedHandle.vue')
// const viewMzDiagChinaMedReview  = () => import( './view/mzDiag/chinaMedReview.vue')
// const viewMzDiagExam  = () => import( './view/mzDiag/exam.vue')
// const viewMzDiagNormalSearch  = () => import( './view/mzDiag/normalSearch.vue')
// const viewMzDiagWestMed  = () => import( './view/mzDiag/westMed.vue')
// //
// const viewVideoIndex  = () => import( './view/video/index.vue')
// //
// const viewYxApplyIndex  = () => import( './view/yxApply/index.vue')
// const viewYxApplyYxApplyNext  = () => import( './view/yxApply/yxApplyNext.vue')

Vue.use(Router)

export default new Router({
    //mode: 'history',
    routes: [{
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: Index
        },
        // {
        //     path: '/view/blApply/index',
        //     component: viewBlApplyIndex
        // },
        // {
        //     path: '/view/blApply/blApply',
        //     component: viewBlApplyBlApply,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/blApply/blApplyNext',
        //     component: viewBlApplyBlApplyNext,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/blApply/blType',
        //     component: viewBlApplyBlApplyBlType
        // },
        // {
        //     path: '/view/blApply/editAddress',
        //     component: viewBlApplyBlApplyEditAddress
        // },
        // {
        //     path: '/view/blApply/oftenAddress',
        //     component: viewBlApplyBlApplyOftenAddress
        // },
        // {
        //     path: '/view/blApply/selectItem',
        //     component: viewBlApplyBlApplySelectItem
        // },
        // {
        //     path: '/view/commonCaseHistory/index',
        //     component: viewCommonCaseHistoryIndex
        // },
        // {
        //     path: '/view/commonCaseHistory/detail',
        //     component: viewCommonCaseHistoryDetail
        // },
        // {
        //     path: '/view/commonCaseHistory/lookCaseHistory',
        //     component: viewCommonCaseHistoryLookCaseHistory
        // },
        // {
        //     path: '/view/commonDraft/index',
        //     component: viewCommonDraftIndex
        // },
        // {
        //     path: '/view/commonMain/index',
        //     component: viewCommonMainIndex
        // },
        // {
        //     path: '/view/commonPay/index',
        //     component: viewCommonPayIndex
        // },
        // {
        //     path: '/view/commonPay/payFail',
        //     component: viewCommonPayPayFail
        // },
        // {
        //     path: '/view/commonPay/payQrCode',
        //     component: viewCommonPayPayQrCode
        // },
        // {
        //     path: '/view/commonPay/paySuccess',
        //     component: viewCommonPayPaySuccess
        // },
        // {
        //     path: '/view/commonSelectDiag/index',
        //     component: viewCommonSelectDiagIndex
        // },
        // {
        //     path: '/view/commonSelectPro/index',
        //     component: viewCommonSelectProIndex
        // },
        // {
        //     path: '/view/commonSelectPro/index1',
        //     component: viewCommonSelectProIndex1
        // },
        // {
        //     path: '/view/commonSelectPro/index2',
        //     component: viewCommonSelectProIndex2
        // },
        // {
        //     path: '/view/commonSelectPro/detail',
        //     component: viewCommonSelectProDetail
        // },
        // {
        //     path: '/view/commonWaitPay/index',
        //     component: viewCommonWaitPayIndex
        // },
        // {
        //     path: '/view/detail/blDiag/index',
        //     component: viewDetailBlDiagIndex
        // },
        // {
        //     path: '/view/detail/caseDetail/index',
        //     component: viewDetailCaseDetailIndex
        // },
        // {
        //     path: '/view/detail/caseDetail/index',
        //     component: viewDetailCaseDetailIndex
        // },
        // {
        //     path: '/view/detail/commonEvaluate/index',
        //     component: viewDetailCommonEvaluateIndex
        // },
        // {
        //     path: '/view/detail/commonRefuse/index',
        //     component: viewDetailCommonRefuseIndex
        // },
        // {
        //     path: '/view/detail/commonReportDetail/index',
        //     component: viewDetailCommonReportDetailIndex
        // },
        
        // {
        //     path: '/view/detail/hzDiag/index',
        //     component: viewDetailhzDiagHzDiagIndex
        // },
        // {
        //     path: '/view/detail/hzReportDetail/index',
        //     component: viewDetailhzDiagHzReportDetailIndex
        // },
        // {
        //     path: '/view/detail/mzDetail/index',
        //     component: viewDetailhzDiagMzDetailIndex
        // },
        // {
        //     path: '/view/detail/mzReportDetail/index',
        //     component: viewDetailhzDiagMzReportDetailIndex
        // },
        // {
        //     path: '/view/detail/mzReportDetail/evaluate',
        //     component: viewDetailhzDiagMzReportDetailEvaluate
        // },
        // {
        //     path: '/view/detail/yxDiag/index',
        //     component: viewDetailhzDiagYxDiaglIndex
        // },
        // {
        //     path: '/view/hzApply/index',
        //     component: viewHzApplyIndex,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/hzApply/applyType',
        //     component: viewHzApplyApplyType
        // },
        // {
        //     path: '/view/hzApply/baseInfo',
        //     component: viewHzApplyApplyBaseInfo,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/hzApply/consultInfo',
        //     component: viewHzApplyApplyConsultInfo,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/mzApply/index',
        //     component: viewMzApplyIndex
        // },
        // {
        //     path: '/view/mzApply/index1',
        //     component: viewMzApplyIndex1
        // },
        // {
        //     path: '/view/mzApply/index2',
        //     component: viewMzApplyIndex2
        // },
        // {
        //     path: '/view/mzApply/completed',
        //     component: viewMzApplyCompleted,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/mzApply/submitApply',
        //     component: viewMzApplySubmitApply
        // },
        // {
        //     path: '/view/mzArrange/index',
        //     component: viewMzArrangeIndex
        // },
        // {
        //     path: '/view/mzDiag/index',
        //     component: viewMzDiagIndex,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/mzDiag/check',
        //     component: viewMzDiagCheck,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/mzDiag/chinaMed',
        //     component: viewMzDiagChinaMed
        // },
        // {
        //     path: '/view/mzDiag/chinaMedHandle',
        //     component: viewMzDiagChinaMedHandle
        // },
        // {
        //     path: '/view/mzDiag/chinaMedReview',
        //     component: viewMzDiagChinaMedReview
        // },
        // {
        //     path: '/view/mzDiag/exam',
        //     component: viewMzDiagExam,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/mzDiag/normalSearch',
        //     component: viewMzDiagNormalSearch
        // },
        // {
        //     path: '/view/mzDiag/westMed',
        //     component: viewMzDiagWestMed,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/video/index',
        //     component: viewVideoIndex
        // },
        // {
        //     path: '/view/yxApply/index',
        //     component: viewYxApplyIndex,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
        // {
        //     path: '/view/yxApply/yxApplyNext',
        //     component: viewYxApplyYxApplyNext,
        //     meta:{
        //         keepAlive:true
        //     }
        // },
    ]
})
<!--
    表格组件 直接引用<pageTableAll></pageTableAll>

    表格属性：*为必填 其它为选填
    @param(*) data —————— Array    显示的数据
    @param(*) cols —————— Array    表头数据
    @param(*) pagination —————— Object    分页数据
    @param(*) fetch —————— Function    调用分页的函数
    @param    isexpand —————— Boolean   是否需要缩小到一定宽度展开数据
    @param    height —————— String/Number    Table 的高度
    @param    maxHeight —————— String/Number    Table 的最大高度
    @param    stripe —————— Boolean    是否为斑马纹（默认false）
    @param    border —————— Boolean    是否带有纵向边框（默认false）
    @param    size —————— String    Table 的尺寸（可选值medium / small / mini）
    @param    fit —————— Boolean    列的宽度是否自撑开（默认true）
    @param    showHeader —————— Boolean     是否显示表头（默认true）
    @param    highlightCurrentRow —————— Boolean    是否要高亮当前行（默认false）
    @param    currentRowKey —————— String/Number    当前行的 key，只写属性
    @param    rowClassName —————— Function || String    行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。
    @param    rowStyle —————— Function || Object    行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。
    @param    cellClassName —————— Function || String     单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。
    @param    cellStyle —————— Function || Object     单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。
    @param    headerRowClassName —————— Function || String      表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。
    @param    headerRowStyle —————— Function || Object      表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。
    @param    headerCellClassName —————— Function || String     表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。
    @param    headerCellStyle —————— Function || Object     表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。
    @param    rowKey —————— Function || String      行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
    @param    emptyText —————— String     空数据时显示的文本内容，也可以通过 slot="empty" 设置（默认“暂无数据”）
    @param    defaultExpandAll —————— Boolean       是否默认展开所有行，当 Tale 包含展开行存在或者为树形表格时有效（默认false）
    @param    expandRowKeys —————— Array    可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。
    @param    defaultSort —————— Object     默认的排序列的 prop 和顺序。它的prop属性指定默认的排序的列，order指定默认排序的顺序（order: ascending, descending）     如果只指定了prop, 没有指定order, 则默认顺序是ascending
    @param    tooltipEffect —————— String     tooltip effect 属性（可选值dark/light）
    @param    showSummary —————— Boolean    是否在表尾显示合计行（默认false）
    @param    sumText —————— String   合计行第一列的文本（默认“合计”）
    @param    summaryMethod —————— Function     自定义的合计计算方法 Function({ columns, data })
    @param    spanMethod —————— Function     合并行或列的计算方法 Function({ row, column, rowIndex, columnIndex })
    @param    selectOnIndeterminate —————— Boolean     在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行（默认true）

    表格事件：
    @event    select —————— 当用户手动勾选数据行的 Checkbox 时触发的事件（selection, row）
    @event    selectAll —————— 当用户手动勾选全选 Checkbox 时触发的事件（selection）
    @event    selectionChange —————— 当选择项发生变化时会触发该事件（selection）
    @event    cellMouseEnter —————— 当单元格 hover 进入时会触发该事件（row, column, cell, event）
    @event    cellMouseLeave —————— 当单元格 hover 退出时会触发该事件（row, column, cell, event）
    @event    cellClick —————— 当某个单元格被点击时会触发该事件（row, column, cell, event）
    @event    cellDblclick —————— 当某个单元格被双击击时会触发该事件（row, column, cell, event）
    @event    rowClick —————— 当某一行被点击时会触发该事件（row, column, event）
    @event    rowContextmenu —————— 当某一行被鼠标右键点击时会触发该事件（row, column, event）
    @event    rowDblclick —————— 当某一行被双击时会触发该事件（row, column, event）
    @event    headerClick —————— 当某一列的表头被点击时会触发该事件（column, event）
    @event    headerContextmenu —————— 当某一列的表头被鼠标右键点击时触发该事件（column, event）
    @evnet    sortChange —————— 当表格的排序条件发生变化的时候会触发该事件（{ column, prop, order }）
    @event    filterChange —————— 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。（filters）
    @event    currentChange —————— 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性（currentRow, oldCurrentRow）
    @event    headerDragend —————— 当拖动表头改变了列的宽度的时候会触发该事件 （newWidth, oldWidth, column, event）
    @event    expandChange —————— 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）（row, (expandedRows | expanded)）

    表列属性：
    @param    cols：[
        {
            type：   String    对应列的类型。如果设置了 selection 则显示多选框；如果设置了 index 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮（可选值	selection/index/expand）
            index：    number, Function(index)    如果设置了 type=index，可以通过传递 index 属性来自定义索引
            prop：    String    对应列内容的字段名，也可以使用 property 属性
            label：    string    显示的标题
            width：    string    对应列的宽度
            minWidth：    string    对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列
            fixed：    string, boolean      列是否固定在左侧或者右侧，true 表示固定在左侧（可选值true, left, right）
            sortable：    boolean, string    对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件（可选值true, false, 'custom'  默认值false）
            sortMethod：    Function    对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字，和 Array.sort 表现一致
            formatter：    Function     用来格式化内容
            resizable：    boolean      对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真）（默认值true）
            columnKey：    string       column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件
            filters：    Array[{ text, value }]     数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。
            filterMethod：    Function(value, row, column)     数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。
            filterPlacement：    String     过滤弹出框的定位（与 Tooltip 的 placement 属性相同）
            filterMultiple：    Boolean     数据过滤的选项是否多选（默认值true）
            filteredValue：     Array       选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。
            align：     String      对齐方式（可选值left/center/right   默认值left）
            showOverflowTooltip：    Boolean      当内容过长被隐藏时显示 tooltip（默认值false）
            headerAlign：    String     表头对齐方式，若不设置该项，则使用表格的对齐方式（可选值left/center/right）
            className：     string	    列的 className
            labelClassName：     string     当前列标题的自定义类名
            selectable：    Function(row, index)    仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
            reserveSelection：      Boolean     仅对 type=selection 的列有效，类型为 Boolean，为 true 则会在数据更新之后保留之前选中的数据（需指定 row-key）（默认值false）
            button：    Boolean     是否为按钮组（默认值false）
            toolbar：    Array      按钮的样式数据
                        toolbar： [
                            {
                                name: "编辑",      // 按钮名称
                                type: "warning",      // 按钮类型
                                icon: "el-icon-edit"     // 按钮图标
                                onclick: (row,index) => {    //按钮点击事件 row 当前行数据  index 当前行的位置
                                    consoel.log(row,index)
                                }
                            }
                        ]
            render:     Function     自定义列表数据
                        render: (row, index) => {
                            return (
                                <span style="color: blue" onClick={e => this.handleClick(e, row)}>{row.address}</span>
                            )
                        }
        }
    ]
    分页属性：
    @param      pagination: {
        page(*)：  Boolean     是否开启分页
        total：     Number      数据的总数
        pageSizes：     Array       每页显示条目个数
        layout：    String      组件布局，子组件名用逗号分隔
        hideOnSinglePage：      Boolean     只有一页时是否隐藏
        pagerCount      Number      总页数，total 和 page-count 设置任意一个就可以达到显示页码的功能；如果要支持 page-sizes 的更改，则需要使用 total 属性
        background      boolean     是否为分页按钮添加背景色
    }
    fetch(*)：     Function        分页切换页码和数量时，重新请求数据
-->
<template>
<div>
    <el-table
        class="hk-table hk-table-small"
        :data="data"
        :height="height"
        :max-height="maxHeight"
        :stripe="stripe"
        :border="border"
        :size="size"
        :fit="fit"
        :show-header="showHeader"
        :highlight-current-row="highlightCurrentRow"
        :current-row-key="currentRowKey"
        :row-class-name="rowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :header-row-class-name="headerRowClassName"
        :header-row-style="headerRowStyle"
        :header-cell-class-name="headerCellClassName"
        :header-cell-style="headerCellStyle"
        :row-key="rowKey"
        :empty-text="emptyText"
        :default-expand-all="defaultExpandAll"
        :expand-row-keys="expandRowKeys"
        :default-sort="defaultSort"
        :tooltip-effect="tooltipEffect"
        :show-summary="showSummary"
        :sum-text="sumText"
        :summary-method="summaryMethod"
        :span-method="spanMethod"
        :select-on-indeterminate="selectOnIndeterminate"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @cell-mouse-enter="cellMouseEnter"
        @cell-mouse-leave="cellMouseLeave"
        @cell-click="cellClick"
        @cell-dblclick="cellDblclick"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        @header-click="headerClick"
        @header-contextmenu="headerContextmenu"
        @sort-change="sortChange"
        @filter-change="filterChange"
        @current-change="currentChange"
        @header-dragend="headerDragend"
        @expand-change="expandChange">
        <!--展开行-->
        <el-table-column  type="expand" v-if="!type">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <template v-for="(list,index) in allcols">
                        <el-form-item :label="list.label">
                            <span>{{ getProp(props.row,list.prop) }}</span>
                        </el-form-item>
                    </template>
                </el-form>
            </template>
        </el-table-column>
        <template v-for="(item,index) in cols" v-if="type">
            <el-table-column
                v-if="item.type"
                :key="index"
                :type="item.type"
                :index="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :sort-method="item.sortMethod"
                :sort-by="item.sortBy"
                :sort-orders="item.sortOrders"
                :formatter="item.formatter"
                :resizable="item.resizable"
                :column-key="item.columnKey"
                :filters="item.filters"
                :filter-method="item.filterMethod"
                :filter-placement="item.filterPlacement"
                :filter-multiple="item.filterMultiple"
                :filtered-value="item.filteredValue"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :header-align="item.headerAlign"
                :class-name="item.className"
                :label-class-name="item.labelClassName"
                :selectable="item.selectable"
                :reserve-selection="item.reserveSelection">
            </el-table-column>
            <el-table-column
                v-else
                :key="index"
                :index="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :sort-method="item.sortMethod"
                :sort-by="item.sortBy"
                :sort-orders="item.sortOrders"
                :formatter="item.formatter"
                :resizable="item.resizable"
                :column-key="item.columnKey"
                :filters="item.filters"
                :filter-method="item.filterMethod"
                :filter-placement="item.filterPlacement"
                :filter-multiple="item.filterMultiple"
                :filtered-value="item.filteredValue"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :header-align="item.headerAlign"
                :class-name="item.className"
                :label-class-name="item.labelClassName"
                :selectable="item.selectable"
                :reserve-selection="item.reserveSelection">
                <template slot-scope="scope">
                    <template v-if="!item.render">
                        {{scope.row[item.prop]}}
                    </template>
                    <template v-else>
                        <RenderDom :row="scope.row" :index="index" :render="item.render" />
                    </template>
                    <template v-if="item.button">
                        <template v-for="(btn, i) in item.toolbar">
                            <el-button :key="i" :type="btn.type" :size="btn.size || 'mini'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain" @click.stop="btn.onClick(scope.row, scope.$index)">{{btn.name}}</el-button>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
        <template v-for="(item,index) in newcols" v-if="!type">
            <el-table-column
                v-if="item.type"
                :key="index"
                :type="item.type"
                :index="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :sort-method="item.sortMethod"
                :sort-by="item.sortBy"
                :sort-orders="item.sortOrders"
                :formatter="item.formatter"
                :resizable="item.resizable"
                :column-key="item.columnKey"
                :filters="item.filters"
                :filter-method="item.filterMethod"
                :filter-placement="item.filterPlacement"
                :filter-multiple="item.filterMultiple"
                :filtered-value="item.filteredValue"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :header-align="item.headerAlign"
                :class-name="item.className"
                :label-class-name="item.labelClassName"
                :selectable="item.selectable"
                :reserve-selection="item.reserveSelection">
            </el-table-column>
            <el-table-column
                v-else
                :key="index"
                :index="item.index"
                :prop="item.prop"
                :label="item.label"
                :width="item.width"
                :min-width="item.minWidth"
                :fixed="item.fixed"
                :sortable="item.sortable"
                :sort-method="item.sortMethod"
                :sort-by="item.sortBy"
                :sort-orders="item.sortOrders"
                :formatter="item.formatter"
                :resizable="item.resizable"
                :column-key="item.columnKey"
                :filters="item.filters"
                :filter-method="item.filterMethod"
                :filter-placement="item.filterPlacement"
                :filter-multiple="item.filterMultiple"
                :filtered-value="item.filteredValue"
                :align="item.align"
                :show-overflow-tooltip="item.showOverflowTooltip"
                :header-align="item.headerAlign"
                :class-name="item.className"
                :label-class-name="item.labelClassName"
                :selectable="item.selectable"
                :reserve-selection="item.reserveSelection">
                <template slot-scope="scope">
                    <template v-if="!item.render">
                        {{scope.row[item.prop]}}
                    </template>
                    <template v-else>
                        <RenderDom :row="scope.row" :index="index" :render="item.render" />
                    </template>
                    <template v-if="item.button">
                        <template v-for="(btn, i) in item.toolbar">
                            <el-button :key="i" :type="btn.type" :size="btn.size || 'mini'" :icon="btn.icon" :disabled="btn.disabled" :plain="btn.plain" @click.stop="btn.onClick(scope.row, scope.$index)">{{btn.name}}</el-button>
                        </template>
                    </template>
                </template>
            </el-table-column>
        </template>
    </el-table>
    <el-pagination
        v-if="pagination.page"
        :total="pagination.total"
        :page-sizes="pagination.pageSizes"
        :layout="pagination.layout ? pagination.layout : 'total, sizes, prev, pager, next, jumper'"
        :hide-on-single-page="pagination.hideOnSinglePage"
        :pager-count="pagination.pagerCount"
        :background="pagination.background"
        @size-change="handleSizeChange"
        @current-change="handleIndexChange"
        style="margin-top: 20px;text-align: right">
    </el-pagination>
</div>
</template>
<script>
import Vue from "vue";
export default {
    components: {
        RenderDom: {
            functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
            props: {
                row: Object,
                index: Number,
                render: Function
            },
            /**
             * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
             * @param {Object} ctx - 渲染的节点的this对象
             * @argument 传递参数 row index
             */
            render(createElement, ctx){
                const { row, index } = ctx.props
                return ctx.props.render(row, index)
            }
        }
    },
    props: {
        data: {
            type: Array,
            default: function() {
                return [];
            }
        },
        cols: {
            type: Array,
            default: function() {
                return [];
            }
        },
        pagination: {
            type: Object,
            default: function(){
                return {
                    page: false
                }
            }
        },
        fetch: {
            type: Function
        },
        isexpand:{
            type: Boolean,
            default: false
        },
        height: {
            type: String || Number
        },
        maxHeight: {
            type: String || Number
        },
        stripe: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        size: {
            type: String
        },
        fit: {
            type: Boolean,
            default: true
        },
        showHeader: {
            type: Boolean,
            default: true
        },
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        currentRowKey: {
            type: String || Number
        },
        rowClassName: {
            type: Function || String
        },
        rowStyle: {
            type: Function || Object
        },
        cellClassName: {
            type: Function || String
        },
        cellStyle: {
            type: Function || Object
        },
        headerRowClassName: {
            type: Function || String
        },
        headerRowStyle: {
            type: Function || Object
        },
        headerCellClassName: {
            type: Function || String
        },
        headerCellStyle: {
            type: Function || Object
        },
        rowKey: {
            type: Function || String
        },
        emptyText: {
            type: String,
            default: "暂无数据"
        },
        defaultExpandAll: {
            type: Boolean,
            default: false
        },
        expandRowKeys: {
            type: Array
        },
        defaultSort: {
            type: Object
        },
        tooltipEffect: {
            type: String
        },
        showSummary: {
            type: Boolean,
            default: false
        },
        sumText: {
            type: String,
            default: "合计"
        },
        summaryMethod: {
            type: Function
        },
        spanMethod: {
            type: Function
        },
        selectOnIndeterminate: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            type: true,
            newcols: [], // 缩小后的新列表头
            allcols: [], // 缩小后的展开数据
            newoptions: {
                mutiSelect: false,
                index: false
            }
        };
    },
    methods: {
        /* 返回值 */
        getProp: function(row, prop) {
            var data = "";
            for (var key in row) {
                if (key == prop) {
                    data = row[key];
                }
            }
            return data;
        },
        /* 表格事件 */
        select: function(selection, row) {
            this.$emit("select", selection, row);
        },
        selectAll: function(selection) {
            this.$emit("selectAll", selection);
        },
        selectionChange: function(selection) {
            this.$emit("selectionChange", selection);
        },
        cellMouseEnter: function(row, column, cell, event) {
            this.$emit("cellMouseEnter", row, column, cell, event);
        },
        cellMouseLeave: function(row, column, cell, event) {
            this.$emit("cellMouseLeave", row, column, cell, event);
        },
        cellClick: function(row, column, cell, event) {
            this.$emit("cellClick", row, column, cell, event);
        },
        cellDblclick: function(row, column, cell, event) {
            this.$emit("cellDblclick", row, column, cell, event);
        },
        rowClick: function(row, column, event) {
            this.$emit("rowClick", row, column, event);
        },
        rowContextmenu: function(row, column, event) {
            this.$emit("rowContextmenu", row, column, event);
        },
        rowDblclick: function(row, column, event) {
            this.$emit("rowDblclick", row, column, event);
        },
        headerClick: function(column, event) {
            this.$emit("headerClick", column, event);
        },
        headerContextmenu: function(column, event) {
            this.$emit("headerContextmenu", column, event);
        },
        sortChange: function({ column, prop, order }) {
            this.$emit("sortChange", { column, prop, order });
        },
        filterChange: function(filters) {
            this.$emit("filterChange", filters);
        },
        currentChange: function(currentRow, oldCurrentRow) {
            this.$emit("currentChange", currentRow, oldCurrentRow);
        },
        headerDragend: function(newWidth, oldWidth, column, event) {
            this.$emit("headerDragend", newWidth, oldWidth, column, event);
        },
        expandChange: function(row, expandedRows) {
            this.$emit("expandChange", row, expandedRows);
        },
        /* 分页事件 */
        handleSizeChange(size) { // 切换每页显示的数量
            this.pagination.pageSize = size
            this.fetch()
        },
        handleIndexChange(current) { // 切换页码
            this.pagination.pageIndex = current
            this.fetch()
        },
        handleSelectionChange(selection) {
            this.$emit('selection-change', selection)
        },
        handleRowClick(row, event, column) {
            this.$emit('row-click', row, event, column)
        }
    },
    computed: {
        fullWidth: function() {
            return this.$store.state.Common.fullWidth;
        },
    },
    mounted: function() {
        var leftwidth = document.getElementsByClassName("left-side")[0].clientWidth;
        if (this.fullWidth < 960 && this.isexpand) {
            this.allcols = [];
            this.newcols = [];
            var cols = this.cols;
            var ispush = true;
            for (var i = 0; i < cols.length; i++) {
                if (!cols[i].type && cols[i].prop != 'operate') {
                    this.allcols.push(cols[i]);
                }
                if(cols[i].type){
                    this.newcols.push(cols[i])
                }else if(cols[i].prop != 'operate' && !cols[i].render){
                    if(ispush){
                        this.newcols.push(cols[i]);
                        ispush = false;
                    }
                }else if(cols[i].prop == 'operate'){
                    this.newcols.push(cols[i]);
                }
            }
            this.type = false;
        }
    },
    watch: {
        fullWidth: function(val) {
            var leftwidth = document.getElementsByClassName("left-side")[0].clientWidth;
            if (this.fullWidth < 960 && this.isexpand) {
                this.allcols = [];
                this.newcols = [];
                var cols = this.cols;
                var ispush = true;
                for (var i = 0; i < cols.length; i++) {
                    if (!cols[i].type && cols[i].prop != 'operate') {
                        this.allcols.push(cols[i]);
                    }
                    if(cols[i].type){
                        this.newcols.push(cols[i])
                    }else if(cols[i].prop != 'operate'){
                        if(ispush){
                            this.newcols.push(cols[i]);
                            ispush = false;
                        }
                    }else if(cols[i].prop == 'operate'){
                        this.newcols.push(cols[i]);
                    }
                }
                this.type = false;
            } else {
                this.type = true;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>

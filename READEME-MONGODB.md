<!--- MONGODB

    NOSQL là gì:
        - NOSQL có nghĩa là no-relational.
        - NOSQL là "not only SQL"
        - Không sử dụng mô hình dữ liệu quan hệ "RDBMs"
        - Mô hình lưu trữ {"key": "value"}
        - Hệ thống lưu trữ phân tán
        - NOSQL: là hệ cơ sở dữ liệu không ràng buộc, phân tán, mã nguồn mở, khả năng mở rộng theo chiều ngang, có thể chứa hàng petabytes, độ chịu tải và chịu lỗi cao, yêu cầu về tài nguyên phần cứng thấp.


    So sánh giữa NoSQL và SQL
        1) Hiệu xuất:
            - SQL:   chậm hơn NoSQL vì khi truy vấn phải tính toán kiểm tra và sử lý các mối quan hện giữa các bảng.
            - NoSQL: Tốt hơn SQL vì nó bỏ qua các ràng buộc.

        2) Mở rộng theo chiều ngang:
            - SQL:   Có thể thực hiện được nhưng quá trình thực hiện diễn ra rất phức tạp nếu đã tồn tại dữ liệu trong DB.
            - NoSQL: Mở rộng dễ dàng.

        3) Tốc độ Read/write:
            - SQL:   Kém hơn vì nó đảm bảo tính ràng buộc dữ liệu giữa các bảng. Nếu sử dụng nhiều server phải đảm bảo tính nhất quán dữ liệu giữa nhiều server.
            - NoSQL: Tốc độ nhanh hơn SQL vì nó bỏ qua ràng buộc giữa các bảng, vì dữ liệu lưu trong RAM sau đó mới đẩy xuống HDD và nó có tính nhất quán cuối.

        4) Phần cứng:
            - SQL:   Đòi hỏi phần cứng cao.
            - NoSQL: Không đòi hỏi phần cứng quá cao.

        5) Thay đổi số node trong hệ thống:
            - SQL:   Vì tính nhất quán của dữ liệu khi thêm hay xóa node cần phải shutdown hệ thống trong một khoản thời gian.
            - NoSQL: Vì tính nhất quán cuối không cần phải shutdown hệ thống.

        6) Truy vấn và báo cáo:
            - SQL:   Dễ dàng sử dụng ngôn ngữ SQL query để truy vấn trực tiếp dữ liệu từ database hoặc dùng công cụ hỗ trợ để lấy báo cáo.
            - NoSQL: Việc lấy dữ liệu trực tiếp qua NoSQL chưa được hỗ trợ tốt, Thực hiển chủ yếu thông qua giao diện ứng dụng.

        7) Mở rộng dữ liệu:
            - SQL:   Khi muốn bổ sung cột cho một bảng chúng ta phải khai bao trước.
            - NoSQL: Không cần khai báo trước.

        8) Ứng dụng:
            - SQL:   Sử dụng để xây dựng hệ thống chặt chẽ và cần tính đồng nhất về dữ liệu như: tài chính ngân hàng, chứng khoán.
            - NoSQL: Sử dụng xây dựng hệ thống lưu trữ thông tin lớn, không quá quang trọng về vấn đề đôngg nhất dữ liệu trong một thời gian nhất định như. báo trí, mạng xã hội, dịch vụ online.

    Khái niệm cơ bản:
        - Cơ sở dữ liệu trong MongoDB là JSON.
        - Mỗi record trong Mongodb được gọi là document. mỗi document có duy nhất một "_ID" mật định.
        - Tập hợp các document tao thành collection, tương ứng với một bảng trong mySQL.


    Các lệnh cơ bản làm việc với DB.

        - Lệnh run server: tại folder bin ==> open command line.
            + mongod --dbpath <Đường dẫn đến folder data> c:\MongoDB\data
            + Example:
                mongod --dbpath c:\MongoDB\data


        - Khi server đã hoạt động dùng lệnh mongo để viết lệnh trên CMD.
            + mongo


        - Lệnh show tất cả các document tồn tại trong Database.
            + show dbs


        - Lệnh check xem chúng ta đang sử dụng DB nào.
            + db


        - Lệnh chuyển DB đang sử dụng sang DB khác.
            + use <Name DB> myData
            + Example:
                use shopping


        - Lệnh tạo collection cho DB.
            + db.createCollection("< Tên bảng >")
            + Example:
                db.createCollection("book");


        - Lệnh kiểm tra xem có bao nhiêu collections(Các bảng) được tao trong một DB.
            + show collections


        - Lệnh tạo DB.
            + Chú ý: khi use newDB thì use lệnh dùng để tạo database mới, thì check bằng lệnh "show dbs" sẽ không thể thấy được nguyên nhân khi tao ra một DB mới nhưng không đưa vào trong nó collection thì "show dbs" không thấy được cái DB mới vừa tạo.

            + Lệnh tạo DB mới:
                use <Name new DB> newDB

            + Các bước tạo một DB mới trong MongoDB.
                use shopping                                        => lệnh tạo mới DB
                db.createCollection("book)                          => lệnh tạo mới bảng trong DB


        - Lệnh xóa DB.
            + Chú ý: phải đang ở trên DB muốn xóa.
            + db.dropDatabase()


        - Lệnh xóa collection.
            + Chú ý: phải đang ở trên DB muốn xóa.
            + db.<collection_name>.drop()
                - VD: db.user.drop()


        - Lệnh thêm Document vào trong collections của một DB.
            + Câu lệnh:
                db.<name_collection>.insert(<content insert>)
                -VD:   db.users.insert({user_name:"KhanhPham", password:"12345", email: "khanh@gmail.com", status: "active"})

            + Các bước thực hiện:
                1) Chuyển về DB cần thêm dữ liệu.
                    use shopping

                2) Kiểm tra xem bên trong collections đã tồn tại hay chưa.
                    show collections

                3) Thêm nội dung vào collections.
                    db.user.insert({user_name:"KhanhPham", password:"12345", email: "khanh@gmail.com", status: "active"})

                4) kết quả.
                    WriteResult({ "nInserted" : 1 })  => Thông báo thành công

            + Chú ý: trường "_id" sẽ được mongodb thêm tự động vào data khi chúng ta insert vào collection.
            + Cách 2 thêm document vào collections.
                - Câu lệnh:
                    db.<name_collection>.save(<object_content>)

                -VD: có thể viết trong command line.
                    var use = {};
                    use.user_name = "Nguyen Van A";
                    use.password = "123456";
                    use.email = "nguyenvana@gmail.com";
                    use.skill = ["HTML", "CSS", "Javascript"];
                    use.status = "Active";

                    db.user.save(use);
        

        - Lệnh xem data đã thêm và có sẵn trong collections.
            + Câu lệnh:
                db.<name_collection>.find()
                -VD: db.user.find()

            + Câu lệnh hiện thị kiểu JSON:
                db.user.find().pretty()


        - Lệnh xóa collections.
            + Câu lệnh:
                db.<name_collection>.drop()
                -VD: db.user.drop();

        
        - Lệnh xuất DB ra file JSON trong Mongodb: mongoexport.exe
            + Câu lệnh:
                - mongoexport --db <name_db> --collection <name_collection> --out <path_folder_name\name_file>.json

                // Cách viết shorthand
                - mongoexport -d <name_db> -c <name_collection> -o <path_folder_name\name_file>.json

            + Export ra file JSON:
                -VD: ta có DB hiện tại là shopping và 2 collections("Book" và "User") và muốn lưu file là "Users" với định dạng JSON nơi lưu ngay tại thư mục "bin" của MongoDB.

                - Export mật định vào thư mục "bin" của MongoDB.

                    mongoexport --db shopping --collection user --out user.json

                    // Thông báo thành công
                    2022-02-26T11:03:02.096+0700    connected to: localhost
                    2022-02-26T11:03:02.100+0700    exported 3 records


                - Export đến một folder bất kỳ.

                    mongoexport -d shopping -c user -o "C:\Users\Duy\Desktop\export\user.json"
                    // Thông báo thành công
                    2022-02-26T11:10:06.617+0700    connected to: localhost
                    2022-02-26T11:10:06.620+0700    exported 3 records

                
        - Lệnh import từ một file json chứa data vào lại trong DB: mongoimport.exe
            + Câu lệnh:
                - mongoimport -d <name_DB> -c <name_collection> --file <path_folder_export>.json

            + Ví dụ:

                mongoimport -d shopping -c user --file "C:\Users\Duy\Desktop\export\user.json"
                // Thông báo thành công
                2022-02-26T11:27:50.789+0700    connected to: localhost
                2022-02-26T11:27:50.989+0700    imported 3 documents


        - Lệnh xuất DB ra file Excel trong Mongodb: mongoexport.exe
            + Câu lệnh:
                mongoexport -d <name_DB> -c <name_collection> --type=<extendtion_file> -o <path_folder_export>

            + Ví dụ:
                - Câu lệnh chưa chuẩn:
                    mongoexport -d shopping -c user --type=csv -o "C:\Users\Duy\Desktop\export\user.csv"
                    // Thông báo lỗi.
                    2022-02-26T11:42:52.632+0700    Failed: CSV mode requires a field list


                - Câu lệnh chuẩn:
                    mongoexport -d shopping -c user --type=csv -o "C:\Users\Duy\Desktop\export\user.csv" -f "id, userName, password, email, skill, status"
                    // Thông báo thành công.
                    2022-02-26T11:55:53.000+0700    connected to: localhost
                    2022-02-26T11:55:53.059+0700    exported 3 records


            + Chú ý:
                - Lưu ý: nên xuất ra files josn, json hoạt động tốt - excel chưa hoạt động tốt.
                - Khi lưu các tập tin excel phải khai báo header. trong excel thường có các trường ví dụ: user_name bên dưới là data.

        - Lệnh export database: mongoexport.exe
            + Câu lệnh:
                mongodump -d <name_DB> -o <path_folder_export>

                // ZIP lại
                mongodump -d <name_DB> -o <path_folder_export> --gzip

                // Export ra ngay thư mục chưa folder mongodump
                mongodump -d shopping --gzip --archive=<name_save_folder>.gz

            +VD:
                mongodump -d shopping -o "C:\Users\Duy\Desktop\export"                          => Export thông thường.
                mongodump -d shopping -o "C:\Users\Duy\Desktop\export" --gzip                   => Export ra file.gzip.
                mongodump -d shopping --gzip --archive=shopping.26022022.gz                     => Export ra ngay folder chứa tập tin mongodump cua mongodb.


        - Lệnh import database vào của MongoDB: mongorestore.exe
            + Câu lệnh:
                mongorestore -d <name_DB> <path_folder_name_want_import>                        => Lệnh import thông thường
                mongorestore -d <name_DB> <path_folder_name_want_import>  --gzip                => Lệnh import kèm giải nén folder

            
            +VD 01:
                mongorestore -d shopping "C:\Users\Duy\Desktop\export\shopping01"

                // Thông báo thành công
                2022-02-26T13:24:13.854+0700    the --db and --collection args should only be used when restoring from a BSON file. Other uses are deprecated and will not exist in the future; use --nsInclude instead
                2022-02-26T13:24:13.858+0700    building a list of collections to restore from C:\Users\Duy\Desktop\export\shopping01 dir
                2022-02-26T13:24:13.863+0700    reading metadata for shopping.user from C:\Users\Duy\Desktop\export\shopping01\user.metadata.json
                2022-02-26T13:24:13.864+0700    reading metadata for shopping.book from C:\Users\Duy\Desktop\export\shopping01\book.metadata.json
                2022-02-26T13:24:14.096+0700    restoring shopping.user from C:\Users\Duy\Desktop\export\shopping01\user.bson
                2022-02-26T13:24:14.104+0700    no indexes to restore
                2022-02-26T13:24:14.104+0700    finished restoring shopping.user (3 documents)
                2022-02-26T13:24:15.997+0700    restoring shopping.book from C:\Users\Duy\Desktop\export\shopping01\book.bson
                2022-02-26T13:24:15.999+0700    no indexes to restore
                2022-02-26T13:24:16.000+0700    finished restoring shopping.book (0 documents)
                2022-02-26T13:24:16.000+0700    done



            +VD 02:
                mongorestore -d shopping02 "C:\Users\Duy\Desktop\export\shopping02" --gzip

                // Thông báo thành công
                2022-02-26T13:32:29.815+0700    the --db and --collection args should only be used when restoring from a BSON file. Other uses are deprecated and will not exist in the future; use --nsInclude instead
                2022-02-26T13:32:29.816+0700    building a list of collections to restore from C:\Users\Duy\Desktop\export\shopping02 dir
                2022-02-26T13:32:29.863+0700    reading metadata for shopping02.book from C:\Users\Duy\Desktop\export\shopping02\book.metadata.json.gz
                2022-02-26T13:32:29.864+0700    reading metadata for shopping02.user from C:\Users\Duy\Desktop\export\shopping02\user.metadata.json.gz
                2022-02-26T13:32:30.031+0700    restoring shopping02.book from C:\Users\Duy\Desktop\export\shopping02\book.bson.gz
                2022-02-26T13:32:30.032+0700    no indexes to restore
                2022-02-26T13:32:30.032+0700    finished restoring shopping02.book (0 documents)
                2022-02-26T13:32:32.017+0700    restoring shopping02.user from C:\Users\Duy\Desktop\export\shopping02\user.bson.gz
                2022-02-26T13:32:32.020+0700    no indexes to restore
                2022-02-26T13:32:32.020+0700    finished restoring shopping02.user (3 documents)
                2022-02-26T13:32:32.020+0700    done


        - Lệnh thêm bằng Javascript trong mongoDB.
            + Chú ý: MongoDB hỗ trợ các function dùng để thực thi các đoạn script chứa các lệnh thực thi mongoDB.
            + Lệnh thêm và tập tin thêm:
                - các bước tiến hành:
                    1) Trong thư mục data nằm trong folder MongoDB:
                        insert_a_document.js                                        => C:\MongoDB\data\js_excuted

                        - Có nội dung: content có thể đơn hoặc đa Object
                            var user = {
                                user_name: "Nguyen Van B",
                                password: "1234567",
                                email: "nguyenvana@gmail.com",
                                status: "active"
                            }
                            db.user.insert(user);


                    2) MongoDB cung cấp function load() để load và thực thi các file Javascript.
                        + load(<path_file_name>)
                            Thực thi trong commant line của MongoDB.

                        +VD:
                            load("C:\MongoDB\data\js_excuted\insert_a_document.js")

                            // Thông báo lỗi
                            2022-02-26T14:27:36.360+0700 E -        [thread1] file [C:MongoDBdatajs_excutedinsert_a_document.js] doesn't exist
                            2022-02-26T14:27:36.411+0700 E QUERY    [thread1] Error: error loading js file: C:MongoDBdatajs_excutedinsert_a_document.js :
                            @(shell):1:1

                            [Khắc phục]
                            load("C:/MongoDB/data/js_excuted/insert_a_document.js")

                            // Thông báo thành công
                            true

        - Lệnh Update Documents Fields trong MongDB:
            + Lệnh cập nhật:

                db.collection.update(
                    <query>,                                       => query tìm đối tượng theo yêu cầu là JSON.
                    <update>,                                      => giá trị cần update là JSON.
                    {
                        upsert: <boolean>,                         => usert khi tìm không thấy có thể thêm mới.
                        multi: <boolean>                           => multi thêm trên nhiều document, mật định thêm cho vị trí đầu tiên tìm thấy.
                    }
                )

            + Example:
                db.user.update(
                    { 
                        user_name: "KhanhPham123"
                    },
                    {
                        $set: { 
                            password: 2345678
                        }
                    },
                    {
                        upsert: true,
                        multi: true
                    }
                )

                // Thông báo thành công
                Updated 1 existing record(s) in 32ms


            + Option kiểm tra xem một phần tử có tồn tại hay không.
                { field: { $exists: <boolean> } }                  => $exists có giá trị true/false, true là tồn tại/ false thì không.

            
            + Example:
                db.user.update(
                    {email: {$exists: false}},
                    {$set: {email: "Email mật định"}},
                    {
                        upsert: true,
                        multi: true
                    }
                )
                
                // Thông báo thành công
                Updated 1 existing record(s) in 46ms

        - Lệnh remove Document field trong mongoDB (xóa các column trong table).
            + Câu lệnh:
                
                db.collection.update(
                    <query>,                                       => query tìm đối tượng theo yêu cầu là JSON. có thể bỏ trống
                    <update>,                                      => giá trị cần update là JSON, unset option dùng để xóa
                    {
                        upsert: <boolean>,                         => usert khi tìm không thấy có thể thêm mới.
                        multi: <boolean>                           => multi thêm trên nhiều document, mật định thêm cho vị trí đầu tiên tìm thấy.
                    }
                )

            + Chú ý: chỉ xóa đi property(trường) trong bảng

            + Example:
                db.user.update(
                    {},
                    {$unset: {status: "", skill: ""}},
                    {
                        upsert: false,
                        multi: true
                    }
                )

                // Thông báo thành công
                Updated 8 existing record(s) in 16ms

        - Lệnh remove document field trong mongoDB (xóa một row trong table)
            + Xóa thông thường:
            + Câu lệnh:
                db.collection.remove(
                    <query>,                                        => query tìm đối tượng theo yêu cầu là JSON
                    {
                        justOne: <boolean>                          => xóa một hay nhiều true/ false
                    }
                )

            + Chú ý: xóa hẳng một document (môt dòng JSON) đi.

            + Example:
                db.user.remove(
                    {user_name: "Nguyen Van C"},
                    {
                        justOne: false                              => xóa tất cả Object có user_name là "Nguyen Van C"
                    }
                )

            
            + Xóa theo điều kiện: điều kiên bằng($eq)/ lơn hơn($gt).
            + Câu lệnh:
                db.collection.remove(
                    { <field>: { $eq: <value> } },                  => query tìm đối tượng theo yêu cầu là JSON
                    {
                        justOne: <boolean>                          => xóa một hay nhiều true/ false
                    }
                )


            + Example:
                db.user.remove(
                    {
                        user_name: {$eq: "Nguyen Van C"},
                        password: {$eq: "1234567"},
                        age: {$eq: 32}
                    },
                    {
                        justOne: true
                    }
                )

                // Thông báo thành công
                Removed 1 record(s) in 1ms

            + Example:
                db.user.remove(
                    {age: {$gt: 30}},
                    {justOne: true}
                )

                // Thông báo thành công
                Removed 1 record(s) in 1ms

            + Example: Kiểm tra hai điều kiện cùng một lúc $gt và $lte.
                db.user.remove(
                    {age: {$gt: 20}, age: {$lte: 30}},
                    {justOne: true}
                )

                // Thông báo thành công
                Removed 1 record(s) in 1ms

            + Example: Xóa phần tử nếu phần tử đó có trong mảng, $in(Kiểm tra phần tử có tồn tại trong mảng).
                db.user.remove(
                    {skill: {$in: ["JAVA"]}},
                    {justOne: false}
                )

                // Thông báo thành công
                Removed 1 record(s) in 1ms


        - Lệnh truy vấn kết quả trong database của MongoDB (Find & Query & Projection operators trong MongoDB).
            Query:
            + Đếm số record (document) có trong collection.
                db.<name_collection>.find({}).count();

            + Tìm theo điều kiên.
                db.<name_collection>.find({"name_filed": "value query"});

            Projection:
            + Tìm kiếm theo điều kiện hiển thị thông tin các trường theo mong muốn.
                db.<name_collection>.find({}, {"name_key": 1, "name_key": 0})

                - đối số thứ 2 cung cấp thông tin các trường cần truy cập với các đối số 1: là hiện - 0: là không lấy thông tin

            Phân trang:
            + Phương thức limit();
                db.<name_collection>.find({}).limit(<number_item_query>).skip(<number_start_query>);
                - Limit(<number_item_query>): Phương thức limit() quy định số phần tử sẽ lấy.
                - skip(<number_start_query>): Phương thức skip() vị trí bắt đầu truy vấn.

            Câu lệnh điều kiện:
            + Tìm nhiều phần tử.
                db.<name_collection>.find("_id": {$in: [ObjectId(1......), ObjectId(2......)]});
                - Toán tử $in(bằng với a hoặc bằng với b): tìm phần có điều kiện đúng với những giá trị trong mảng đã cho trước.
                - VD: Tìm những phần tử có tuổi lớn hơn 30 và nhỏ hơn 40 hiện có trong database.
                db.user.find({
                    age: {
                        $gt: 30,
                        $lt: 40
                    }
                });

                - VD: Tìm người dùng có khả năng nói tiếng anh tốt trong khoản 3 - 7 và giả sử ta có một đối tượng như sau.
                    {
                        "user_name": "Nguyễn Văn Thành",
                        "email": "vanthanh@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "english": 9,
                            "VietNam": 10
                        }
                    }

                db.user.find({"speaking.VietNam": {$gt: 9, $lt: 10}});

                - Toán tử $ne(không bằng): Tìm phần tử có điều kiệm không đúng với giá trị cần so sánh.
                - VD: Tìm người dùng không biết ngôn ngữ lập trình "PHP".
                    {
                        "user_name": "Nguyễn Văn Thành",
                        "email": "vanthanh@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "english": 9,
                            "VietNam": 10
                        }
                    }

                db.user.find({"skills": {$en: "PHP"}});

                - Toán tử $or(hoặc): Tìm phần tử có giá trị bằng với a hoặc bằng với b.
                - VD: Tìm người dùng biết tiếng Nhật Bản leve: 5 hoặc tiếng Viêt Nam leve: > 5.
                    {
                        "user_name": "Nguyễn Văn Thành",
                        "email": "vanthanh@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "VietNam": 10,
                            "English": 5
                        }
                    },
                    {
                        "user_name": "Nguyễn Thành Luân",
                        "email": "thanhluan@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "Japan": 3,
                            "English": 10
                        }
                    }

                db.user.find({
                    $or: [
                        "speaking.VietName": {$gt: 5},
                        "speaking.Japan": {$eq: 5}
                    ]
                });

                - Toán tử $not(Phủ định): phủ định của một điều kiện nào đó.
                - VD: Tìm người dùng có leve tiếng Anh không bẳng 8.
                    {
                        "user_name": "Nguyễn Văn Thành",
                        "email": "vanthanh@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "VietNam": 10,
                            "English": 5
                        }
                    },
                    {
                        "user_name": "Nguyễn Thành Luân",
                        "email": "thanhluan@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "Japan": 3,
                            "English": 10
                        }
                    }

                db.user.find({
                    "english.speaking": {$not: 8}
                });

            Sort:Sắp xếp dữ liệu
                - Phương thức sắp xếp dữ liệu nhận vào 2 giá trị: (1) sắp xếp tăng dần - (-1): sắp xếp giảm dần
                - VD: Sắp xếp người dùng theo tuổi và khả năng nói tiếng anh của họ.
                    {
                        "user_name": "Nguyễn Văn Thành",
                        "email": "vanthanh@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "age": 30,
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "VietNam": 10,
                            "English": 5
                        }
                    },
                    {
                        "user_name": "Nguyễn Thành Luân",
                        "email": "thanhluan@gmail.com,
                        "password": "Npd97*93",
                        "status": "active",
                        "age": 27,
                        "skills": [HTML, CSS, JS, PHP],
                        "speaking": {
                            "Japan": 3,
                            "English": 10
                        }
                    }

                db.user.find({}).sort({age: 1, "speaking.english": -1"});

            Xem câu query thực hiện ta dùng cú pháp như sau:
                db.user.find({}).explain("executionStats");

            - Nó sẽ trả ra những thông tin cần biết về câu query thực hiện. => Cách truy vấn này ảnh hưởng đến tốc đọ truy vấn khi database của chúng ta tăng kích thươc lên theo thời gian sử dụng và truy cập của người dùng.
            - Để giải quyết Mongodb cung cấp một phương thức Indexes: Phương thức Indexes trong database được sử dụng để tối ưu quá trình tìm kiếm, Indexes trong database cũng giống như mục lục trông một cuốn sách, Thay vì ta phải tìm từng trang trong cuốn sách database ta tạo một mục lục, ta sẽ dựa vào mục lục để tìm nội dung trong cuốn sách database. Qua đó giúp câu lệnh truy vấn nhanh hơn.
            - Một câu truy vấn không có indexes được rọi là truy vấn "Table scan". Nghĩa là phải xem qua toàn bộ database để tìm document kết quả truy vấn. và đối với các collection lơn hình thức truy cập nãy sẽ rất chậm.

            - VD: Giả sử tao có một database khoản 1000000 document trong đó.

            - Kỹ thuật Single Indexes trong mongodb.

            - Trước khi thêm indexes vào trong field:
                db.users.find({username: 'user112'}).explain("executionStats")["executionStats"]
                {
                    "executionSuccess" : true,
                    "nReturned" : 1,
                    "executionTimeMillis" : 269,                => Thời gian thực hiện truy vấn trước khi thêm indexes.
                    "totalKeysExamined" : 0,
                    "totalDocsExamined" : 1000000,
                    "executionStages" : {
                        "stage" : "COLLSCAN",
                        "filter" : {
                            "username" : {
                                "$eq" : "user112"
                            }
                        },
                        "nReturned" : 1,
                        "executionTimeMillisEstimate" : 211,
                        "works" : 1000002,
                        "advanced" : 1,
                        "needTime" : 1000000,
                        "needYield" : 0,
                        "saveState" : 7813,
                        "restoreState" : 7813,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "direction" : "forward",
                        "docsExamined" : 1000000
                    }
                }

            - Sau khi thêm indexes vào field .
                db.users.createIndex({username: 1}) // Đánh index cho username theo thứ tự tăng dần, -1 là giảm dần.
                db.users.getIndexes() // Xem index nào đã có.
                [
                    {
                        "v" : 2,
                        "key" : {
                            "_id" : 1
                        },
                        "name" : "_id_",
                        "ns" : "test.users"
                    },
                    {
                        "v" : 2,
                        "key" : {
                            "username" : 1
                        },
                        "name" : "username_1",
                        "ns" : "test.users"
                    }
                ]

                - Thực hiện lại lệnh query:
                db.users.find({username: 'user112'}).explain("executionStats")["executionStats"]
                {
                    "executionSuccess" : true,
                    "nReturned" : 1,
                    "executionTimeMillis" : 3,                      => Thời gian truy vấn đã giảm xuống.
                    "totalKeysExamined" : 1,
                    "totalDocsExamined" : 1,
                    "executionStages" : {
                        "stage" : "FETCH",
                        "nReturned" : 1,
                        "executionTimeMillisEstimate" : 0,
                        "works" : 2,
                        "advanced" : 1,
                        "needTime" : 0,
                        "needYield" : 0,
                        "saveState" : 0,
                        "restoreState" : 0,
                        "isEOF" : 1,
                        "invalidates" : 0,
                        "docsExamined" : 1,
                        "alreadyHasObj" : 0,
                        "inputStage" : {
                            "stage" : "IXSCAN",
                            "nReturned" : 1,
                            "executionTimeMillisEstimate" : 0,
                            "works" : 2,
                            "advanced" : 1,
                            "needTime" : 0,
                            "needYield" : 0,
                            "saveState" : 0,
                            "restoreState" : 0,
                            "isEOF" : 1,
                            "invalidates" : 0,
                            "keyPattern" : {
                                "username" : 1
                            },
                            "indexName" : "username_1",
                            "isMultiKey" : false,
                            "multiKeyPaths" : {
                                "username" : [ ]
                            },
                            "isUnique" : false,
                            "isSparse" : false,
                            "isPartial" : false,
                            "indexVersion" : 2,
                            "direction" : "forward",
                            "indexBounds" : {
                                "username" : [
                                    "[\"user112\", \"user112\"]"
                                ]
                            },
                            "keysExamined" : 1,
                            "seeks" : 1,
                            "dupsTested" : 0,
                            "dupsDropped" : 0,
                            "seenInvalidated" : 0
                        }
                    }
                }

        - Dạng đầy đủ của câp truy vân Thực hiện truy vấn thực tế trên bảng biểu dữ liệu database trong hệ cơ sở dữ liệu có trong database:
            + Trước khi thêm indexes cho một record trong document. thời gian query mất khoản 7 millis second.
                db.users.find({"password": "12345"}).sort({"user_name" 1}).explain("executionStats")

                {
                    "queryPlanner" : {
                        "plannerVersion" : 1,
                        "namespace" : "codeudemy.users",
                        "indexFilterSet" : false,
                        "parsedQuery" : {
                            "password" : {
                                "$eq" : "12345"
                            }
                        },
                        "winningPlan" : {
                            "stage" : "SORT",
                            "sortPattern" : {
                                "user_name" : 1.0
                            },
                            "inputStage" : {
                                "stage" : "SORT_KEY_GENERATOR",
                                "inputStage" : {
                                    "stage" : "COLLSCAN",
                                    "filter" : {
                                        "password" : {
                                            "$eq" : "12345"
                                        }
                                    },
                                    "direction" : "forward"
                                }
                            }
                        },
                        "rejectedPlans" : []
                    },
                    "executionStats" : {
                        "executionSuccess" : true,
                        "nReturned" : 6,
                        "executionTimeMillis" : 71,
                        "totalKeysExamined" : 0,
                        "totalDocsExamined" : 9,
                        "executionStages" : {
                            "stage" : "SORT",
                            "nReturned" : 6,
                            "executionTimeMillisEstimate" : 10,
                            "works" : 19,
                            "advanced" : 6,
                            "needTime" : 12,
                            "needYield" : 0,
                            "saveState" : 0,
                            "restoreState" : 0,
                            "isEOF" : 1,
                            "invalidates" : 0,
                            "sortPattern" : {
                                "user_name" : 1.0
                            },
                            "memUsage" : 953,
                            "memLimit" : 33554432,
                            "inputStage" : {
                                "stage" : "SORT_KEY_GENERATOR",
                                "nReturned" : 6,
                                "executionTimeMillisEstimate" : 10,
                                "works" : 12,
                                "advanced" : 6,
                                "needTime" : 5,
                                "needYield" : 0,
                                "saveState" : 0,
                                "restoreState" : 0,
                                "isEOF" : 1,
                                "invalidates" : 0,
                                "inputStage" : {
                                    "stage" : "COLLSCAN",
                                    "filter" : {
                                        "password" : {
                                            "$eq" : "12345"
                                        }
                                    },
                                    "nReturned" : 6,
                                    "executionTimeMillisEstimate" : 10,
                                    "works" : 11,
                                    "advanced" : 6,
                                    "needTime" : 4,
                                    "needYield" : 0,
                                    "saveState" : 0,
                                    "restoreState" : 0,
                                    "isEOF" : 1,
                                    "invalidates" : 0,
                                    "direction" : "forward",
                                    "docsExamined" : 9
                                }
                            }
                        }
                    },
                    "serverInfo" : {
                        "host" : "LAPTOP-H32JOGGO",
                        "port" : 27017,
                        "version" : "3.6.23",
                        "gitVersion" : "d352e6a4764659e0d0350ce77279de3c1f243e5c"
                    },
                    "ok" : 1.0
                }

            + Sau khi thêm hoặc đánh chỉ số index cho record trong database.
                db.users.createIndex({"user_name": 1})

                {
                    "createdCollectionAutomatically" : false,
                    "numIndexesBefore" : 1,
                    "numIndexesAfter" : 2,
                    "ok" : 1.0
                }

                db.users.getIndexes()

                /* 1 */
                [
                    {
                        "v" : 2,
                        "key" : {
                            "_id" : 1
                        },
                        "name" : "_id_",
                        "ns" : "codeudemy.users"
                    },
                    {
                        "v" : 2,
                        "key" : {
                            "user_name" : 1.0
                        },
                        "name" : "user_name_1",
                        "ns" : "codeudemy.users"
                    }
                ]

            + Sau khi đã đánh chỉ số indexes cho record trong document.
                db.users.find({"password": "12345"}).sort({"user_name" 1}).explain("executionStats")

                /* 1 */
                {
                    "queryPlanner" : {
                        "plannerVersion" : 1,
                        "namespace" : "codeudemy.users",
                        "indexFilterSet" : false,
                        "parsedQuery" : {
                            "password" : {
                                "$eq" : "12345"
                            }
                        },
                        "winningPlan" : {
                            "stage" : "FETCH",
                            "filter" : {
                                "password" : {
                                    "$eq" : "12345"
                                }
                            },
                            "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                    "user_name" : 1.0
                                },
                                "indexName" : "user_name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                    "user_name" : []
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                    "user_name" : [ 
                                        "[MinKey, MaxKey]"
                                    ]
                                }
                            }
                        },
                        "rejectedPlans" : []
                    },
                    "executionStats" : {
                        "executionSuccess" : true,
                        "nReturned" : 6,
                        "executionTimeMillis" : 57,
                        "totalKeysExamined" : 9,
                        "totalDocsExamined" : 9,
                        "executionStages" : {
                            "stage" : "FETCH",
                            "filter" : {
                                "password" : {
                                    "$eq" : "12345"
                                }
                            },
                            "nReturned" : 6,
                            "executionTimeMillisEstimate" : 11,
                            "works" : 10,
                            "advanced" : 6,
                            "needTime" : 3,
                            "needYield" : 0,
                            "saveState" : 1,
                            "restoreState" : 1,
                            "isEOF" : 1,
                            "invalidates" : 0,
                            "docsExamined" : 9,
                            "alreadyHasObj" : 0,
                            "inputStage" : {
                                "stage" : "IXSCAN",
                                "nReturned" : 9,
                                "executionTimeMillisEstimate" : 11,
                                "works" : 10,
                                "advanced" : 9,
                                "needTime" : 0,
                                "needYield" : 0,
                                "saveState" : 1,
                                "restoreState" : 1,
                                "isEOF" : 1,
                                "invalidates" : 0,
                                "keyPattern" : {
                                    "user_name" : 1.0
                                },
                                "indexName" : "user_name_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                    "user_name" : []
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                    "user_name" : [ 
                                        "[MinKey, MaxKey]"
                                    ]
                                },
                                "keysExamined" : 9,
                                "seeks" : 1,
                                "dupsTested" : 0,
                                "dupsDropped" : 0,
                                "seenInvalidated" : 0
                            }
                        }
                    },
                    "serverInfo" : {
                        "host" : "LAPTOP-H32JOGGO",
                        "port" : 27017,
                        "version" : "3.6.23",
                        "gitVersion" : "d352e6a4764659e0d0350ce77279de3c1f243e5c"
                    },
                    "ok" : 1.0
                }


        - Kỹ thuật compund index trong mongodb.





--->
using BlogDataLibrary.Data;
using BlogDataLibrary.Database;
using BlogDataLibrary.Models;
using Microsoft.Extensions.Configuration;
using System.Data;

namespace BlogTestUI
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SqlData db = GetConnection();
            int choice = -1;

            Console.WriteLine("-=====- Menu -=====-\n" +
                              "1: Register\n" +
                              "2: Authenticate\n" +
                              "3: Add Posts\n" +
                              "4: List Posts\n" +
                              "5: Show Detailed Posts\n" +
                              "Choice: ");
            choice = Int32.Parse(Console.ReadLine());

            switch (choice)
            {
                case 1:
                    Register(db);
                    break;
                case 2:
                    Authenticate(db);
                    break;
                case 3:
                    AddPost(db);
                    break;
                case 4:
                    ListPosts(db);
                    break;
                case 5:
                    ShowPostDetails(db);
                    break;
                default:
                    Authenticate(db);
                    break;
            }

            Console.WriteLine("Press Enter to exit...");
            Console.ReadLine();

        }

        static SqlData GetConnection()
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("D:\\OneDrive\\Desktop\\School\\Mapua\\College\\2nd Year IT\\3rd Term\\IT128 and IT128L\\WEEK 4\\Documents\\Lab Exercise 3\\Pulgar-LE3\\BlogTestUI\\appsettings.json");

            IConfiguration config = builder.Build();
            ISqlDataAccess dbAccess = new SqlDataAccess(config);
            SqlData db = new SqlData(dbAccess);
            
            return db;

        }

        private static UserModel GetCurrentUser(SqlData db)
        {
            Console.Write("Username: ");
            string username = Console.ReadLine();

            Console.Write("Password: ");
            string password = Console.ReadLine();

            UserModel user = db.Authenticate(username, password);

            return user;
        }

        public static void Authenticate(SqlData db)
        {
            UserModel user = GetCurrentUser(db);

            if(user == null)
            {
                Console.WriteLine("Invalid Credentials.");
            }
            else
            {
                Console.WriteLine($"Welcome, {user.UserName}");
            }
        }

        public static void Register(SqlData db)
        {
            Console.Write("Enter new username: ");
            var username = Console.ReadLine();

            Console.Write("Enter new password: ");
            var password = Console.ReadLine();

            Console.Write("Enter new first name: ");
            var firstName = Console.ReadLine();

            Console.Write("Enter new last name: ");
            var lastName = Console.ReadLine();

            db.Register(username, firstName, lastName, password);
        }

        private static void AddPost(SqlData db)
        {
            UserModel user = GetCurrentUser(db);

            Console.Write("Title: ");
            string title = Console.ReadLine();

            Console.Write("Write body: ");
            string body = Console.ReadLine();

            PostModel post = new PostModel
            {
                Title = title,
                Body = body,
                DateCreated = DateTime.Now,
                UserId = user.Id
            };

            db.AddPost(post);
        }

        private static void ListPosts(SqlData db)
        {
            List<ListPostModel> posts = db.ListPosts();

            foreach(ListPostModel post in posts)
            {
                Console.WriteLine($"{post.Id}. Title: {post.Title} by {post.UserName} [{post.DateCreated.ToString("yyyy-MM-dd")}]");
                Console.WriteLine($"{post.Body.Substring(0, 20)}...");
                Console.WriteLine();
            }
        }

        private static void ShowPostDetails(SqlData db)
        {
            Console.WriteLine("Enter a post ID: ");
            int id = Int32.Parse(Console.ReadLine());

            ListPostModel post = db.ShowPostsDetails(id);
            Console.WriteLine(post.Title);
            Console.WriteLine($"by {post.FirstName} {post.LastName} [{post.UserName}]");
            Console.WriteLine();
            Console.WriteLine(post.Body);
            Console.WriteLine(post.DateCreated.ToString("MMM d yyyy"));
        }

    }
}
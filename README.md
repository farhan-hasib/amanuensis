# Amanuensis

Amanuensis (Latin āmanuēnsis, “secretary”, from ab-, “from” + manus, “hand”)  
noun - a literary or artistic assistant, in particular one who takes dictation or copies manuscripts.

A MVP AI Note App to take notes from speech in real-time using Speech-to-Text API and chat with the notes using a range of powerful OpenAI GPT models. 

## Demo

https://github.com/user-attachments/assets/ae314f2b-cba7-40c6-b442-7354c360748c

## Getting Started

To try out from web:
1. Visit https://amanuensis.vercel.app
2. Sign-in using Google
3. Paste your OpenAI API key (get your OpenAI API key from OpenAI)

To run locally:
1. Clone the repo
2. Create `.env.local` in the `root` directory
3. Paste the following in the file:
  ```
GOOGLE_CLIENT_ID=YOUR-GOOGLE-CLIENT-ID-FROM-GOOGLE-CLOUD-CONSOLE
GOOGLE_CLIENT_SECRET=YOUR-GOOGLE-CLIENT-SECRET-FROM-GOOGLE-CLOUD-CONSOLE
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=GENERATE-NEXTAUTH-SECRET
MONGODB_URI=YOUR-MONGODB-URI
  ```

4.  Learn how to setup `google oauth` and get `google client id` and `google client secret` keys. Learn how to generate `nextauth secret` key. Learn how to setup `mongodb` database and get `mongodb uri`
5. Replace the above with your appropriate keys
6. Run `npm install` from the `root` of the directory. Install `npm` if you don't have it
7. Run `npm run dev`
8. Go to `http://localhost:3000` in your browser
9. Sign-in using Google
10. Paste your openai api key (get your openapi key from openai)



## Roadmap

- [x] Multiple GPT models support
- [ ] User account management system
- [ ] Option to save notes for each user
- [ ] Subscription options
- [ ] Extending support to other LLMs (Claude, Gemini, etc.)
- [ ] Multiple language support
- [ ] Better speech to text tool to detect questions, exclamatory sentences, etc.
- [ ] Fix bugs

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request.  
Please contact regarding any bugs or issues.  

## Contact

Farhan Hasib - farhanhasib08@gmail.com

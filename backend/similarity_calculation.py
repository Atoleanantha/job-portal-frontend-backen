import sys
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def calculate_similarity(resumes, job_description):
    corpus = [resume['content'] for resume in resumes]
    vectorizer = CountVectorizer().fit_transform(corpus)
    job_vector = vectorizer.transform([job_description])
    similarities = cosine_similarity(vectorizer, job_vector)
    return similarities.flatten().tolist()

if __name__ == "__main__":
    input_data = json.loads(sys.argv[1])
    resumes = input_data['resumes']
    job_description = input_data['jobDescription']
    similarities = calculate_similarity(resumes, job_description)
    print(json.dumps(similarities))

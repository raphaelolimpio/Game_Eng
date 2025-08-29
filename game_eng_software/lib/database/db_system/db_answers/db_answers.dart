import 'dart:convert';
import 'dart:ffi';
import 'package:http/http.dart' as http;

class DbAnswers {
  final String baseUrl = 'http://localhost:3000/answers';

  Future<List<dynamic>> getAnswers() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load answers');
    }
  }

  Future<dynamic> getAnswerById(int id) async {
    final response = await http.get(Uri.parse('$baseUrl/$id'));
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Failed to load answers');
    }
  }

  Future<void> createAnswer(
    int idMatch,
    int idQuest,
    int idUser,
    int idGroup,
    String answers,
    bool isTrue,
    Float pontosConquistados,
    DateTime timeTamp,
  ) async {
    final response = await http.post(
      Uri.parse(baseUrl),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'idMatch': idMatch,
        'idQuest': idQuest,
        'idUser': idUser,
        'idGroup': idGroup,
        'answers': answers,
        'isTrue': isTrue,
        'pontosConquistados': pontosConquistados,
        'timeTamp': timeTamp.toIso8601String(),
      }),
    );

    if (response.statusCode != 201) {
      throw Exception('Failed to create alternative');
    }
  }

  Future<void> updateAlternative(
    int id,
    int idMatch,
    int idQuest,
    int idUser,
    int idGroup,
    String answers,
    bool isTrue,
    Float pontosConquistados,
    DateTime timeTamp,
  ) async {
    final response = await http.put(
      Uri.parse('$baseUrl/$id'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, dynamic>{
        'idMatch': idMatch,
        'idQuest': idQuest,
        'idUser': idUser,
        'idGroup': idGroup,
        'answers': answers,
        'isTrue': isTrue,
        'pontosConquistados': pontosConquistados,
        'timeTamp': timeTamp.toIso8601String(),
      }),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to update alternative');
    }
  }

  Future<void> deleteAlternative(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));

    if (response.statusCode != 200) {
      throw Exception('Failed to delete alternative');
    }
  }
}
